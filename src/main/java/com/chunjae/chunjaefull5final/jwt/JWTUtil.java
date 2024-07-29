package com.chunjae.chunjaefull5final.jwt;

import com.chunjae.chunjaefull5final.dto.UserDTO;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTUtil {
    private final SecretKey secretKey;

    public JWTUtil(@Value("${spring.jwt.secret}")String secret) {


        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    public String getUsername(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("email", String.class);
    }

    public String getRole(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }

    public Long getUid(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("uid", Long.class);
    }

    public Long getUidByRequest(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        String jwt = null;
        String username = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("Authorization".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                }
            }
        }

        Long uid = null;
        try{
            uid = getUid(jwt);
        }catch (Exception e){
            System.out.println("아마 쿠키에서 받아올 수 있는 게 없어서 그러는듯 : " + e);
        }
        return uid;
    }

    public Boolean isExpired(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }

    public Long getExpiredPeriod(String token){
        Long exp = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("exp", Long.class);
        Long iat = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("iat", Long.class);
        return exp-iat;
    }

    public String getSnsId(String token){
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("snsId", String.class);
    }
    public void refreshExpiredTime(HttpServletResponse response, String token){
        String refreshToken;

        Long uid = getUid(token);
        String role = getRole(token);
        Long expiredMs = getExpiredPeriod(token);

        String email;
        String snsId;
        if(getSnsId(token) == null){
            email = getUsername(token);
            refreshToken = Jwts.builder()
                    .claim("uid",uid)
                    .claim("email", email)
                    .claim("role", role)
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis() + expiredMs))
                    .signWith(secretKey)
                    .compact();

        }else{
            snsId = getSnsId(token);

            refreshToken = Jwts.builder()
                    .claim("uid",uid)
                    .claim("role", role)
                    .claim("snsId",snsId)
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis() + expiredMs))
                    .signWith(secretKey)
                    .compact();

        }
        Cookie jwtCookie = new Cookie("Authorization", refreshToken);

        jwtCookie.setHttpOnly(true); // 클라이언트 측 스크립트에서 쿠키 접근 불가
        jwtCookie.setSecure(true); // HTTPS에서만 쿠키 전송
        jwtCookie.setPath("/"); // 모든 경로에서 쿠키 사용 가능
        jwtCookie.setMaxAge(60 * 60 * 10); // 쿠키의 유효기간 설정 (초 단위)

        response.addCookie(jwtCookie);

    }

    // 토큰 생성
    public String createJwtNormal(long uid,String username, String role, Long expiredMs) {


        System.out.println(username);
        return Jwts.builder()
                .claim("uid",uid)
                .claim("email", username)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }
    // 토큰 생성
    public String createJwtSns(long uid, String snsId, String role, Long expiredMs) {

        return Jwts.builder()
                .claim("uid",uid)
                .claim("role", role)
                .claim("snsId",snsId)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }
}
