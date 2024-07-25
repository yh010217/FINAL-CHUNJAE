package com.chunjae.chunjaefull5final.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
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

        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(0);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/step2").setViewName("forward:/index.html");
        registry.addViewController("/step3").setViewName("forward:/index.html");
        // 필요한 다른 경로도 추가
    }

    /*
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/")
                .setViewName("스프링 프로젝트 내 리액트 빌드 파일 경로");
        registry.addViewController("/{spring:\\w+}")
                .setViewName("스프링 프로젝트 내 리액트 빌드 파일 경로");
        registry.addViewController("/*{spring:\\w+}")
            .setViewName("스프링 프로젝트 내 리액트 빌드 파일 경로");
        registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css|\\.json)$}")
                .setViewName("스프링 프로젝트 내 리액트 빌드 파일 경로");
    }
    */
}
                
