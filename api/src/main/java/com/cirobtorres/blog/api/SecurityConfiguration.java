package com.cirobtorres.blog.api;

import com.cirobtorres.blog.api.oauth2.BlogOAuth2UserService;
import com.cirobtorres.blog.api.oauth2.BlogOidcUserService;
import com.cirobtorres.blog.api.oauth2.OAuth2SuccessHandler;
import com.cirobtorres.blog.api.token.JwtAuthenticationFilter;
import jakarta.servlet.http.Cookie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class SecurityConfiguration {
    private final String frontUrl;
    // private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(SecurityConfiguration.class);

    public SecurityConfiguration(
            ApiApplicationProperties apiApplicationProperties
    ) {
        // this.isProd = apiApplicationProperties.getApplication().isProduction();
        this.frontUrl = apiApplicationProperties.getFrontend().getUrl();
    }

    @Bean
    @Order(1)
    public SecurityFilterChain oauth2SecurityFilterChain(
            HttpSecurity http,
            BlogOidcUserService blogOidcUserService,
            BlogOAuth2UserService blogOAuth2UserService,
            OAuth2SuccessHandler oAuth2SuccessHandler
    ) throws Exception {
        return http
                .securityMatcher("/oauth2/**", "/login/oauth2/**")
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .sessionManagement(sm ->
                        sm.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                )
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfo -> userInfo
                                .oidcUserService(blogOidcUserService)
                                .userService(blogOAuth2UserService)
                        )
                        .successHandler(oAuth2SuccessHandler)
                )
                .build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain apiSecurityFilterChain(
            HttpSecurity http,
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) throws Exception {
        return http
                .securityMatcher("/**")
                .cors(cors -> {})
                .csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler())
                        .ignoringRequestMatchers(
                                "/auth/login",
                                "/auth/register",
                                "/auth/refresh",
                                "/auth/validation",
                                "/auth/renew-code",
                                "/auth/password-reset-email-request",
                                "/auth/password-reset-code",
                                "/auth/password-reset"
                        )
                )
                .sessionManagement(sm ->sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                HttpMethod.POST,
                                "/auth/login",
                                "/auth/logout",
                                "/auth/register",
                                "/auth/refresh",
                                "/auth/password-reset-email-request",
                                "/auth/password-reset-code"
                        ).permitAll()
                        .requestMatchers(
                                HttpMethod.GET,
                                "/auth/validation",
                                "/users/me",
                                "/articles"
                        ).permitAll()
                        .requestMatchers(
                                HttpMethod.POST,
                                "/auth/password-reset"
                        ).hasAuthority("PASSWORD_RESET")
                        .requestMatchers(
                                HttpMethod.POST,
                                "/articles"
                        ).hasAuthority("AUTHOR")
                        .requestMatchers("/.well-known/jwks.json").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth -> oauth
                        .bearerTokenResolver(bearerTokenResolver())
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Remove "ROLE_" prefix
    @Bean
    public GrantedAuthorityDefaults grantedAuthorityDefaults() {
        return new GrantedAuthorityDefaults("");
    }

    // Remove "SCOPE_" prefix
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        var authoritiesConverter = new JwtGrantedAuthoritiesConverter();
        authoritiesConverter.setAuthorityPrefix("");
        authoritiesConverter.setAuthoritiesClaimName("authorities");

        var converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            // Get authorities (USER, ADMIN, AUTHOR, etc)
            var authorities = authoritiesConverter.convert(jwt);
            var finalAuthorities = new ArrayList<>(authorities);

            // Adds "type" as a temporary authority
            // The user has authority to change its password as long as the duration of the token
            String type = jwt.getClaimAsString("type");
            if (type != null) {
                finalAuthorities.add(new SimpleGrantedAuthority(type)); // PASSWORD_RESET
            }

            return finalAuthorities;
        });
        return converter;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of(frontUrl));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public BearerTokenResolver bearerTokenResolver() {
        return request -> {
            if (request.getCookies() == null) return null;
            // Tries access_token first
            String accessToken = Arrays.stream(request.getCookies())
                    .filter(cookie -> "access_token".equals(cookie.getName()))
                    .map(Cookie::getValue)
                    .findFirst()
                    .orElse(null);

            if (accessToken != null) return accessToken;

            // If none, tries reset_token
            return Arrays.stream(request.getCookies())
                    .filter(cookie -> "reset_password_token".equals(cookie.getName()))
                    .map(Cookie::getValue)
                    .findFirst()
                    .orElse(null);
        };
    }
}
