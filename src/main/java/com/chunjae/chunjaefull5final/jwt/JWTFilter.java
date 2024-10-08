package com.chunjae.chunjaefull5final.jwt;

import com.chunjae.chunjaefull5final.domain.User;
import com.chunjae.chunjaefull5final.domain.UserRole;
import com.chunjae.chunjaefull5final.service.user.CustomUserDetails;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {

        this.jwtUtil = jwtUtil;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Cookie[] cookies = request.getCookies();
        String token = null;

        Cookie jwtCookie = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("Authorization".equals(cookie.getName())) {
                    jwtCookie = cookie;
                    token = cookie.getValue();
                }
            }
        }

        try {


            if (token != null && !"".equals(token) && !jwtUtil.isExpired(token)) {

                jwtUtil.refreshExpiredTime(response, token);

                //토큰에서 username과 role 획득
                String username = jwtUtil.getUsername(token);
                String role = jwtUtil.getRole(token);

                //userEntity를 생성하여 값 set
                User userEntity = new User();
                userEntity.setEmail(username);
                userEntity.setPwd("temppassword");
                userEntity.setRole(UserRole.valueOf(role.split("_")[1]));

                //UserDetails에 회원 정보 객체 담기
                CustomUserDetails customUserDetails = new CustomUserDetails(userEntity);

                //스프링 시큐리티 인증 토큰 생성
                Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
                //세션에 사용자 등록
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else if (token != null && !"".equals(token) && jwtUtil.isExpired(token)) {
                jwtCookie.setMaxAge(0);
            }
        }catch (ExpiredJwtException e){
            System.out.println(e);
            if(jwtCookie != null) {
                jwtCookie.setMaxAge(0);
            }
        }

        filterChain.doFilter(request, response);
    }
}