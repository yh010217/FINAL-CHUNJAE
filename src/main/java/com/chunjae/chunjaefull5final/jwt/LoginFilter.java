package com.chunjae.chunjaefull5final.jwt;

import com.chunjae.chunjaefull5final.domain.User;
import com.chunjae.chunjaefull5final.dto.UserDTO;
import com.chunjae.chunjaefull5final.service.user.CustomUserDetails;
import com.chunjae.chunjaefull5final.service.user.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.Nullable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Collection;
import java.util.Iterator;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;



    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {

        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        //클라이언트 요청에서 username, password 추출
        String username = obtainUsername(request);
        String password = obtainPassword(request);
        String snsId = obtainSnsId(request);
        System.out.println(snsId);



        //스프링 시큐리티에서 username과 password를 검증하기 위해서는 token에 담아야 함
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password, null);

        Authentication result = null;
        try {
            //token에 담은 검증을 위한 AuthenticationManager로 전달
            result = authenticationManager.authenticate(authToken);
        }catch (Exception e){
            System.out.println(e);
        }

        setDetails(request, authToken);

        return result;
    }
    @Override
    @Nullable
    protected String obtainUsername(HttpServletRequest request) {
        return request.getParameter("email");
    }

    @Override
    @Nullable
    protected String obtainPassword(HttpServletRequest request) {
        return request.getParameter("pwd");
    }

    @Nullable
    protected String obtainSnsId(HttpServletRequest request) {
        return request.getParameter("snsId");
    }

    //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {

        //UserDetails
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        Long uid = customUserDetails.getUid();
        String email = customUserDetails.getUsername();
        String realName = customUserDetails.getRealName();
        String snsId = customUserDetails.getSnsId();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();

        String token = "";
        if(snsId == null){
            token = jwtUtil.createJwtNormal(uid,email,realName, 1000*60*30L);
        }else{
            token = jwtUtil.createJwtSns(uid,snsId,role, 1000*60*30L);
        }

        Cookie jwtCookie = new Cookie("Authorization", token);

        jwtCookie.setHttpOnly(true); // 클라이언트 측 스크립트에서 쿠키 접근 불가
        jwtCookie.setSecure(true); // HTTPS에서만 쿠키 전송
        jwtCookie.setPath("/"); // 모든 경로에서 쿠키 사용 가능
        jwtCookie.setMaxAge(60 * 60 * 10); // 쿠키의 유효기간 설정 (초 단위)

        response.addCookie(jwtCookie);

        response.addHeader("Authorization", "Bearer " + token);

        try {
            chain.doFilter(request, response);
        }catch (Exception e){
            System.out.println("chain doFilter 중에 예외"+e);
        }
    }

    //로그인 실패시 실행하는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        //로그인 실패시 401 응답 코드 반환
        response.setStatus(401);
    }
}