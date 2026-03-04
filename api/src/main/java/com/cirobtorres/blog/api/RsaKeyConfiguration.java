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
    public RSAPublicKey rsaPublicKey() throws Exception {
        if (publicKey == null || publicKey.isBlank()) {
            throw new IllegalArgumentException("A chave pública RSA_PUBLIC_CONTENT está vazia ou nula!");
        }

        try {
            String cleanKey = publicKey.replaceAll("\\s", "");
            byte[] decoded = Base64.getDecoder().decode(cleanKey);
            X509EncodedKeySpec spec = new X509EncodedKeySpec(decoded);
            return (RSAPublicKey) KeyFactory.getInstance("RSA").generatePublic(spec);
        } catch (Exception e) {
            log.error("Erro ao decodificar a Chave Pública. Verifique se o conteúdo no Dokploy é um Base64 puro (sem hífens).");
            throw e;
        }
    }

    @Bean
    public RSAPrivateKey rsaPrivateKey() throws Exception {
        if (privateKey == null || privateKey.isBlank()) {
            throw new IllegalArgumentException("A chave privada RSA_PRIVATE_CONTENT está vazia ou nula!");
        }

        try {
            String cleanKey = privateKey.replaceAll("\\s", "");
            byte[] decoded = Base64.getDecoder().decode(cleanKey);
            PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(decoded); // Private usa PKCS8
            return (RSAPrivateKey) KeyFactory.getInstance("RSA").generatePrivate(spec);
        } catch (Exception e) {
            log.error("Erro ao decodificar a Chave Privada.");
            throw e;
        }
    }
}
