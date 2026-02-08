package com.cirobtorres.blog.api;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "api-properties")
public class ApiApplicationProperties {

    private final Frontend frontend = new Frontend();
    private final Jwt jwt = new Jwt();

    public Frontend getFrontend() { return frontend; }
    public Jwt getJwt() { return jwt; }

    public static class Frontend {
        private String url;
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
    }

    public static class Jwt {
        private String issuer;
        private long expiration;
        public String getIssuer() { return issuer; }
        public void setIssuer(String issuer) { this.issuer = issuer; }
        public long getExpiration() { return expiration; }
        public void setExpiration(long expiration) { this.expiration = expiration; }
    }
}
