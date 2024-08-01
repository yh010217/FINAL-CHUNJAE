package com.chunjae.chunjaefull5final.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/file/**")
                .allowedOrigins("http://localhost:3000", "http://43.201.252.185")
                .allowedMethods("POST")
                .allowedHeaders("*");

        registry.addMapping("/test/**")
                .allowedOrigins("http://localhost:3000", "http://43.201.252.185")
                .allowedMethods("POST")
                .allowedHeaders("*");

        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://43.201.252.185")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");

        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:8080", "https://img.chunjae-platform.com", "http://localhost:3000", "http://43.201.252.185")
                .allowedMethods("POST", "GET")
                .allowedHeaders("*");

        registry.addMapping("/upload/**")
                .allowedOrigins("https://img.chunjae-platform.com", "http://localhost:8080", "http://localhost:3000", "http://43.201.252.185")
                .allowedMethods("POST", "GET")
                .allowedHeaders("*");

        registry.addMapping("/save")
                .allowedOrigins("http://localhost:3000","http://localhost:8080", "http://43.201.252.185")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);

        registry.addMapping("/loading")
                .allowedOrigins("http://localhost:3000","http://localhost:8080", "http://43.201.252.185")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");

        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080", "http://43.201.252.185")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);

        registry.addMapping("/convertImage")
                .allowedOrigins("http://localhost:8080","https://img.chunjae-platform.com", "http://43.201.252.185")
                .allowedMethods("GET", "POST", "PUT", "DELETE","OPTION")
                .allowedHeaders("*")
                .allowCredentials(true);
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

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        // 기본 메시지 컨버터를 설정합니다.
        converters.add(new FormHttpMessageConverter());
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

