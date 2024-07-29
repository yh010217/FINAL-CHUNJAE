package com.chunjae.chunjaefull5final.config;
// import com.chunjae.chunjaefull5final.config.oauth.CustomOAuth2UserService;
import com.chunjae.chunjaefull5final.config.oauth.OAuth2UserService;
import com.chunjae.chunjaefull5final.service.user.CustomUserDetails;
import com.chunjae.chunjaefull5final.service.user.UserDetailService;
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

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2UserService oAuth2UserService;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .requestMatchers(
                        //로그인 하지 않고 들어가기 가능(css, js 없이)
                        "/resources/**"
                        , "/css/**"
                        , "/js/**"
                        , "/images/**"
                        , "/static/css/**"
                        , "/static/js/**"
                        , "/full5-final-react/images/**"
                        , "/full5-final-react/css/**"
                        , "/full5-final-react/src/**"
                        , "/full5-final-react/component/**"
                        , "/test/error"
                        , "/file/**"
                        , "/preview/**"
                        , "/step0/**"
                        , "/api/**"
                         , "/step1/**"
                        , "/step2/**"

                );
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {

        http.csrf(csrf ->
                csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()));


//     http.csrf(csrf-> csrf.disable());

        http.authorizeHttpRequests(authorize ->
                authorize
                        //전체허용
                        .requestMatchers("/file/**", "/test/error","/error","/api/**").permitAll()
                        .requestMatchers("/join", "/login", "/logout", "/checkEmail", "/index").permitAll()
                        //관리자허용
                        .requestMatchers("/admin/**","/userdelete/**","/userdetail/**","/errorstatus/**").hasRole("Admin")
                        //정지회원제외
                        .requestMatchers("/step0/**","/step1/**", "/step2/**","/preview/**").hasAnyRole("Admin", "Teacher", "User")
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


        return http.build();
    }

    @Bean
    public PasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

}