package com.cirobtorres.blog.api;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "api-properties")
public class ApiApplicationProperties {
    private final Application application = new Application();
    private final Frontend frontend = new Frontend();
    private final Jwt jwt = new Jwt();

    public Frontend getFrontend() { return frontend; }
    public Application getApplication() {
        return application;
    }
    public Jwt getJwt() { return jwt; }

    public static class Application {
        private String privateKey;
        private String publicKey;
        private String url;
        private String mailerFrom;
        private String mediaUpServName;
        private String mediaUpServKey;
        private String mediaUpServSecret;
        private boolean production;

        public String getPrivateKey() {
            return privateKey;
        }
        public void setPrivateKey(String privateKey) {
            this.privateKey = privateKey;
        }

        public String getPublicKey() {
            return publicKey;
        }
        public void setPublicKey(String publicKey) {
            this.publicKey = publicKey;
        }

        public String getUrl() {
            return url;
        }
        public void setUrl(String url) {
            this.url = url;
        }

        public String getMailerFrom() {
            return mailerFrom;
        }
        public void setMailerFrom(String mailerFrom) {
            this.mailerFrom = mailerFrom;
        }

        public String getMediaUpServName() { return mediaUpServName; }
        public void setMediaUpServName(String mediaUpServName) { this.mediaUpServName = mediaUpServName; }

        public String getMediaUpServKey() { return mediaUpServKey; }
        public void setMediaUpServKey(String mediaUpServKey) { this.mediaUpServKey = mediaUpServKey; }

        public String getMediaUpServSecret() { return mediaUpServSecret; }
        public void setMediaUpServSecret(String mediaUpServSecret) { this.mediaUpServSecret = mediaUpServSecret; }

        public boolean isProduction() {
            return production;
        }
        public void setProduction(boolean production) {
            this.production = production;
        }
    }

    public static class Frontend {
        private String url;

        public String getUrl() {
            return url;
        }
        public void setUrl(String url) {
            this.url = url;
        }
    }

    public static class Jwt {
        private String issuer;
        private long expAccToken;
        private long expRefToken;
        private String accTokenPath;
        private String refTokenPath;

        public String getIssuer() {
            return issuer;
        }
        public void setIssuer(String issuer) {
            this.issuer = issuer;
        }

        public long getExpAccToken() {
            return expAccToken;
        }
        public void setExpAccToken(long expAccToken) {
            this.expAccToken = expAccToken;
        }

        public long getExpRefToken() {
            return expRefToken;
        }
        public void setExpRefToken(long expRefToken) {
            this.expRefToken = expRefToken;
        }

        public String getAccTokenPath() {
            return accTokenPath;
        }
        public void setAccTokenPath(String accTokenPath) {
            this.accTokenPath = accTokenPath;
        }

        public String getRefTokenPath() {
            return refTokenPath;
        }
        public void setRefTokenPath(String refTokenPath) {
            this.refTokenPath = refTokenPath;
        }
    }
}
