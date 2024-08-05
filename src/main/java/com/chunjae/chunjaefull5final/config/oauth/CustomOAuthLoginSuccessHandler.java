package com.chunjae.chunjaefull5final.config.oauth;

import com.chunjae.chunjaefull5final.domain.PrincipalDetail;
import com.chunjae.chunjaefull5final.domain.User;
import com.chunjae.chunjaefull5final.jwt.JWTUtil;
import com.chunjae.chunjaefull5final.repository.User.UserRepository;
import com.chunjae.chunjaefull5final.service.user.CustomUserDetails;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class CustomOAuthLoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;

    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        log.info(".....auth login success.........");


        PrincipalDetail principalDetail = (PrincipalDetail) authentication.getPrincipal();
        String subId = principalDetail.getAttribute("sub");

        User userEntity = userRepository.findBySnsId(subId).orElse(null);

        CustomUserDetails user = new CustomUserDetails(userEntity);

        //스프링 시큐리티 인증 토큰 생성
        Authentication authToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        //세션에 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);


        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();
        String token = jwtUtil.createJwtSns(user.getUid(), subId,role, 1000*60*30L);

        Cookie jwtCookie = new Cookie("Authorization", token);

        jwtCookie.setHttpOnly(true); // 클라이언트 측 스크립트에서 쿠키 접근 불가
        jwtCookie.setSecure(true); // HTTPS에서만 쿠키 전송
        jwtCookie.setPath("/"); // 모든 경로에서 쿠키 사용 가능
        jwtCookie.setMaxAge(60 * 60); // 쿠키의 유효기간 설정 (초 단위)

        response.addCookie(jwtCookie);

        response.addHeader("Authorization", "Bearer " + token);


        response.sendRedirect("/index");

    }
}
