package com.chunjae.chunjaefull5final.jwt;

import com.chunjae.chunjaefull5final.dto.UserDTO;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
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

    // 토큰 생성
    public String createJwtNormal(long uid,String username,String realName, String role, Long expiredMs) {


        System.out.println(username);
        return Jwts.builder()
                .claim("uid",uid)
                .claim("email", username)
                .claim("role", role)
                .claim("realName", realName)
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