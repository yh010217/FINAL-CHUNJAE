package com.chunjae.chunjaefull5final.config.oauth;

import com.chunjae.chunjaefull5final.domain.User;
import com.chunjae.chunjaefull5final.jwt.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Slf4j
@RequiredArgsConstructor
public class CustomOAuthLoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        log.info(".....auth login success.........");


        //UserDetails
        Object customUserDetails = authentication.getPrincipal();
/*

        Long uid = customUserDetails.getUid();
        String snsId = customUserDetails.getSnsId();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();

        String token = "";
        token = jwtUtil.createJwtSns(uid, snsId, role, 1000 * 60 * 30L);


        Cookie jwtCookie = new Cookie("Authorization", token);

        jwtCookie.setHttpOnly(true); // 클라이언트 측 스크립트에서 쿠키 접근 불가
        jwtCookie.setSecure(true); // HTTPS에서만 쿠키 전송
        jwtCookie.setPath("/"); // 모든 경로에서 쿠키 사용 가능
        jwtCookie.setMaxAge(60 * 60 * 10); // 쿠키의 유효기간 설정 (초 단위)

        response.addCookie(jwtCookie);

        response.addHeader("Authorization", "Bearer " + token);
*/

        response.sendRedirect("/index");

    }
}
