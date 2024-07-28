package com.chunjae.chunjaefull5final.config.oauth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;

import java.io.IOException;

public class CustomOAuthLoginFilter extends OAuth2LoginAuthenticationFilter {
    public CustomOAuthLoginFilter(ClientRegistrationRepository clientRegistrationRepository, OAuth2AuthorizedClientService authorizedClientService) {
        super(clientRegistrationRepository, authorizedClientService);
    }

    public CustomOAuthLoginFilter(ClientRegistrationRepository clientRegistrationRepository, OAuth2AuthorizedClientService authorizedClientService, String filterProcessesUrl) {
        super(clientRegistrationRepository, authorizedClientService, filterProcessesUrl);
    }

    public CustomOAuthLoginFilter(ClientRegistrationRepository clientRegistrationRepository, OAuth2AuthorizedClientRepository authorizedClientRepository, String filterProcessesUrl
    ) {
        super(clientRegistrationRepository, authorizedClientRepository, filterProcessesUrl);
    }

    public CustomOAuthLoginFilter(ClientRegistrationRepository clientRegistrationRepository, OAuth2AuthorizedClientRepository authorizedClientRepository, String filterProcessesUrl
            , AuthenticationManager authenticationManager) {
        super(clientRegistrationRepository, authorizedClientRepository, filterProcessesUrl);
        super.setAuthenticationManager(authenticationManager);
    }
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        System.out.println("여기가 문젠가...?");
        Authentication authentication = null;
        try {
            authentication = super.attemptAuthentication(request, response);
        }catch (Exception e){
            System.out.println(e);
        }
        return authentication;
    }

        @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("여기 도착");
        super.successfulAuthentication(request, response, chain, authResult);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        System.out.println("unsuccess 라고...?");
        super.unsuccessfulAuthentication(request, response, failed);
    }
}
