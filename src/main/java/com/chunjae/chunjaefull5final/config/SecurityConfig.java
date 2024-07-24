package com.chunjae.chunjaefull5final.config;

// import com.chunjae.chunjaefull5final.config.oauth.CustomOAuth2UserService;
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

   // private final CustomOAuth2UserService customOAuth2UserService;

    private final OAuth2UserService oAuth2UserService;
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

                );
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()));

        http.authorizeHttpRequests(authorize ->
                authorize
                        .requestMatchers("/file/**", "/test/error","/error").permitAll()
                        .requestMatchers("/join", "/login", "/logout", "/checkEmail", "/oauth2/authorization/google", "/index").permitAll()
                        .requestMatchers("/admin/**").hasRole("Admin")
                        .requestMatchers("/step1/**", "/step2/**").hasAnyRole("Admin", "Teacher", "User")
                        .anyRequest().authenticated()
        );


        http.formLogin(formLogin -> formLogin
                .loginPage("/login")
                .loginProcessingUrl("/login")
                .usernameParameter("email")
                .passwordParameter("pwd")
                .defaultSuccessUrl("/index")
                .permitAll()
        );

        http.logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/index")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
        );

        http.oauth2Login(oauth2Login -> oauth2Login
                .loginPage("/oauth2/login")
                .defaultSuccessUrl("/index")
                .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint.userService(oAuth2UserService))
        );

        return http.build();
    }

    @Bean
    public PasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}