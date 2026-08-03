package com.cirobtorres.blog.api;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "api-properties")
public class ApiApplicationProperties {
    private final Application application = new Application();
    private final Frontend frontend = new Frontend();
    private final Debug debug = new Debug();
    private final Keycloak keycloak = new Keycloak();

    public Frontend getFrontend() { return frontend; }
    public Application getApplication() { return application; }
    public Debug getDebug() { return debug; }
    public Keycloak getKeycloak() { return keycloak; }

    public static class Application {
        private String domain;
        private String mailerFrom;
        private String mediaUpServName;
        private String mediaUpServKey;
        private String mediaUpServSecret;
        private boolean production;

        public String getDomain() {
            return domain;
        }
        public void setDomain(String domain) {
            this.domain = domain;
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

    public static class Keycloak {
        private String keycloakUrl;
        private String issuerUri;
        private String realm;
        private String webClientId;
        private String apiClientId;
        private String apiClientSecret;

        public String getKeycloakUrl() { return keycloakUrl; }
        public void setKeycloakUrl(String keycloakUrl) { this.keycloakUrl = keycloakUrl; }

        public String getIssuerUri() { return issuerUri; }
        public void setIssuerUri(String issuerUri) { this.issuerUri = issuerUri; }

        public String getRealm() { return realm; }
        public void setRealm(String realm) { this.realm = realm; }

        public String getWebClientId() { return webClientId; }
        public void setWebClientId(String webClientId) { this.webClientId = webClientId; }

        public String getApiClientId() { return apiClientId; }
        public void setApiClientId(String apiClientId) { this.apiClientId = apiClientId; }

        public String getApiClientSecret() { return apiClientSecret; }
        public void setApiClientSecret(String apiClientSecret) { this.apiClientSecret = apiClientSecret; }
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

    public static class Debug {
        private String trackUserId;

        public String getTrackUserId() { return trackUserId; }
        public void setTrackUserId(String trackUserId) { this.trackUserId = trackUserId; }
    }
}
