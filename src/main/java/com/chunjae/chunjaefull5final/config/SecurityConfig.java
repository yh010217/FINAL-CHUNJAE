package com.chunjae.chunjaefull5final.config;


import com.chunjae.chunjaefull5final.config.oauth.OAuth2UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2UserService oAuth2UserService;
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return (web) -> web.ignoring()
                .requestMatchers("/resources/**"
                        , "/css/**"
                        , "/js/**"
                        , "/images/**"
                        , "/static/css/**"
                        , "/static/js/**"
                        , "/full5-final-react/images/**"
                        , "/full5-final-react/css/**"
                        , "/full5-final-react/src/**"
                        , "/full5-final-react/component/**"
                        , "/file/**"
                        , "/test/error"
                        , "/preview/**"
                        , "/step0/**"
                        , "/api/**"
                        , "/back/**"
                        , "/step1/**"
                        , "/step2/**"
                        , "/api/**"
                        , "/upload"
                        , "/convertImage"
                        , "/save"

                );
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {

        http.csrf(csrf ->
                csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()));

        http.headers(header->{
            header.frameOptions(frameOptionsConfig -> frameOptionsConfig.sameOrigin());
        });

//     http.csrf(csrf-> csrf.disable());

        http.authorizeHttpRequests(authorize ->
                authorize

                        .requestMatchers("/file/**", "/test/error","/error").permitAll()
                        .requestMatchers("/join", "/login", "/logout"
                                , "/checkEmail", "/**").permitAll()
                        .requestMatchers("/file/**", "/test/error", "/api/**").permitAll()
                        .requestMatchers("/join", "/login", "/logout", "/checkEmail", "/oauth2/authorization/google", "/index").permitAll()
                        .requestMatchers("/admin/**").hasRole("Admin")
                        //정지회원제외
                        .requestMatchers("/step1/**", "/step2/**").hasAnyRole("Admin", "Teacher", "User")


                        .anyRequest().authenticated()
        );


        // 로그인
        http.formLogin(formLogin -> formLogin
                .loginPage("/login")
                .loginProcessingUrl("/login")
                .usernameParameter("email")
                .passwordParameter("pwd")
                .defaultSuccessUrl("/index")
                .permitAll()
        );

        // 로그아웃
        http.logout(logout -> logout.logoutUrl("/logout")
                .logoutSuccessUrl("/index")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
        );


        http.oauth2Login(oauth2Login -> oauth2Login
                .loginPage("/oauth2/login")
                .defaultSuccessUrl("/index")
                .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint.userService(oAuth2UserService))
        );

        http.oauth2Login(httpSecurityOAuth2LoginConfigurer ->
                httpSecurityOAuth2LoginConfigurer.loginPage("/oauth2/login")
                        .defaultSuccessUrl("/index")
                        .userInfoEndpoint(userInfoEndpointConfig ->
                                userInfoEndpointConfig.userService(oAuth2UserService)));

        http.cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                config.setAllowedOrigins(Collections.singletonList("http://localhost:8080"));
                config.setAllowedMethods(Collections.singletonList("*"));
                config.setAllowCredentials(true);
                config.setAllowedHeaders(Collections.singletonList("*"));
                config.setMaxAge(3600L);
                return config;
            }
        }));

        return http.build();
    }

    @Bean
    public PasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }
}
