package com.cirobtorres.blog.api;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "api-properties")
public class ApiApplicationProperties {
    private final Frontend frontend = new Frontend();
    private final Application application = new Application();
    private final Jwt jwt = new Jwt();

    public Frontend getFrontend() { return frontend; }
    public Application getApplication() {
        return application;
    }
    public Jwt getJwt() { return jwt; }

    public static class Frontend {
        private String url;

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }

    public static class Application {
        private String privateKey;
        private String publicKey;
        private String url;
        private String mailerFrom;
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

        public boolean isProduction() {
            return production;
        }

        public void setProduction(boolean production) {
            this.production = production;
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
