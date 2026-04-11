package com.cirobtorres.blog.api.configs;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    private final ApiApplicationProperties apiApplicationProperties;

    public CloudinaryConfig(
            ApiApplicationProperties apiApplicationProperties
    ) {
        this.apiApplicationProperties = apiApplicationProperties;
    }

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", apiApplicationProperties.getApplication().getMediaUpServName(),
                "api_key", apiApplicationProperties.getApplication().getMediaUpServKey(),
                "api_secret", apiApplicationProperties.getApplication().getMediaUpServSecret(),
                "secure", apiApplicationProperties.getApplication().isProduction()
        ));
    }
}