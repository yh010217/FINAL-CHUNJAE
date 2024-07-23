package com.chunjae.chunjaefull5final.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/file/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("POST")
                .allowedHeaders("*");

        registry.addMapping("/test/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("POST")
                .allowedHeaders("*");

        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:8080", "https://img.chunjae-platform.com", "http://localhost:3000")
                .allowedMethods("POST", "GET")
                .allowedHeaders("*");

        registry.addMapping("/upload/**")
                .allowedOrigins("https://img.chunjae-platform.com", "http://localhost:8080", "http://localhost:3000")
                .allowedMethods("POST", "GET")
                .allowedHeaders("*");

        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*");
    }
}
