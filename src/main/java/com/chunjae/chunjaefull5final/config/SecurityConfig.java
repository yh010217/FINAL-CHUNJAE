package com.chunjae.chunjaefull5final.config;


import com.chunjae.chunjaefull5final.config.oauth.OAuth2UserService;
import com.chunjae.chunjaefull5final.jwt.JWTFilter;
import com.chunjae.chunjaefull5final.jwt.JWTUtil;
import com.chunjae.chunjaefull5final.jwt.LoginFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2UserService oAuth2UserService;

    //AuthenticationManager가 인자로 받을 AuthenticationConfiguraion 객체 생성자 주입
    private final AuthenticationConfiguration authenticationConfiguration;

    //JWTUtil 주입
    private final JWTUtil jwtUtil;


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }


    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
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
                        // 모든사람
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
        http.oauth2Login(httpSecurityOAuth2LoginConfigurer ->
                httpSecurityOAuth2LoginConfigurer.loginPage("/oauth2/login")
                        .defaultSuccessUrl("/index2")
                        .userInfoEndpoint(userInfoEndpointConfig ->
                                userInfoEndpointConfig.userService(oAuth2UserService)));


        //JWTFilter 등록
        http
                .addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class);

        http
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil), UsernamePasswordAuthenticationFilter.class);

        //세션 설정
        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));


        return http.build();
    }

    @Bean
    public PasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

}