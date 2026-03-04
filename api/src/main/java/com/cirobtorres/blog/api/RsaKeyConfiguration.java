package com.cirobtorres.blog.api;

import java.security.KeyFactory;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RsaKeyConfiguration {
    private final String privateKey;
    private final String publicKey;
    private static final Logger log = LoggerFactory.getLogger(RsaKeyConfiguration.class);

    public RsaKeyConfiguration(ApiApplicationProperties apiAppProps) {
        this.privateKey = apiAppProps.getApplication().getPrivateKey();
        this.publicKey = apiAppProps.getApplication().getPublicKey();
    }

    @Bean
    RSAPrivateKey rsaPrivateKey() throws Exception {
        log.error("RsaKeyConfiguration.rsaPrivateKey(): privateKey: {}", privateKey);
        String cleanKey = privateKey.replaceAll("\\s", "");
        log.error("RsaKeyConfiguration.rsaPrivateKey(): cleanKey: {}", privateKey);
        byte[] decoded = Base64.getDecoder().decode(cleanKey);
        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(decoded);
        return (RSAPrivateKey) KeyFactory.getInstance("RSA").generatePrivate(spec);
    }

    @Bean
    RSAPublicKey rsaPublicKey() throws Exception {
        log.error("RsaKeyConfiguration.rsaPublicKey(): publicKey: {}", publicKey);
        String cleanKey = publicKey.replaceAll("\\s", "");
        log.error("RsaKeyConfiguration.rsaPublicKey(): cleanKey: {}", cleanKey);
        byte[] decoded = Base64.getDecoder().decode(cleanKey);
        X509EncodedKeySpec spec = new X509EncodedKeySpec(decoded);
        return (RSAPublicKey) KeyFactory.getInstance("RSA").generatePublic(spec);
    }
}
