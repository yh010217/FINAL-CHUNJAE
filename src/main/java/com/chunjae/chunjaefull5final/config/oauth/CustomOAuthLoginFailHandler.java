package com.chunjae.chunjaefull5final.config.oauth;

import com.chunjae.chunjaefull5final.jwt.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class CustomOAuthLoginFailHandler implements AuthenticationFailureHandler {
    private final JWTUtil jwtUtil;
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        log.info(".....auth login fail.........");

        response.setStatus(401);
    }
}
