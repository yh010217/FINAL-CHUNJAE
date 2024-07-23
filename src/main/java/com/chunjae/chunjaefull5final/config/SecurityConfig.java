package com.chunjae.chunjaefull5final.config;


import com.chunjae.chunjaefull5final.config.oauth.OAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2UserService oAuth2UserService;
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return (web) -> web.ignoring()
                .requestMatchers("/resources/**")
                .requestMatchers("/css/**")
                .requestMatchers("/js/**")
                .requestMatchers("/images/**")
                .requestMatchers("/static/css/**")
                .requestMatchers("/static/js/**")
                .requestMatchers("/full5-final-react/images/**")
                .requestMatchers("/full5-final-react/css/**")
                .requestMatchers("/full5-final-react/src/**")
                .requestMatchers("/full5-final-react/component/**")
                .requestMatchers("/preview/all")
                .requestMatchers("/preview/first")
                .requestMatchers("/step0/examId")
                .requestMatchers("/step0/sendExamId")
                .requestMatchers("/preview/info");

//                .requestMatchers("/**");
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception{

        http.csrf(csrf->
                csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()));

//     http.csrf(csrf-> csrf.disable());

        http.authorizeHttpRequests(authorize ->
                authorize
                        // 모든사람
                        .requestMatchers("/join","/login","/logout"
                                ,"/checkEmail","/**").permitAll()
                        .anyRequest().authenticated()
        );

        // 로그인
        http.formLogin(formLogin -> formLogin
                .loginPage("/login")
                .loginProcessingUrl("/login")
                .usernameParameter("email")
                .passwordParameter("pwd")
                .defaultSuccessUrl("/main")
                .permitAll()
        );

        // 로그아웃
        http.logout(logout -> logout.logoutUrl("/logout")
                .logoutSuccessUrl("/main")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
        );
        http.oauth2Login(httpSecurityOAuth2LoginConfigurer ->
                httpSecurityOAuth2LoginConfigurer.loginPage("/oauth2/login")
                        .defaultSuccessUrl("/main")
                        .userInfoEndpoint(userInfoEndpointConfig ->
                                userInfoEndpointConfig.userService(oAuth2UserService)));

        return http.build();
    }
    @Bean
    public PasswordEncoder bCryptPasswordEncoder(){

        return new BCryptPasswordEncoder();
    }
}
