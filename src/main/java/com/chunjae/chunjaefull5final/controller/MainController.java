package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.jwt.JWTUtil;
import com.chunjae.chunjaefull5final.service.user.UserService;
import com.sun.tools.jconsole.JConsoleContext;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@RequiredArgsConstructor
@Slf4j
public class MainController {

    private final UserService userService;

    private final JWTUtil jwtUtil;
    @GetMapping("/index")
    public String main(HttpServletRequest request) {
        final Cookie[] cookies = request.getCookies();
        String jwt = null;
        String username = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("Authorization".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                }
            }
        }
        System.out.println(jwt);
        System.out.println(jwtUtil.getUid(jwt));
        // 이름 따오기
/*        HttpSession session = request.getSession(false);
        Long uid = (Long) session.getAttribute("sessionId");*/

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = SecurityContextHolder.getContext().getAuthentication().getName();


        return "main/index";
    }
    @GetMapping("/index2")
    public String main2(HttpServletRequest request) {

        // 이름 따오기
        HttpSession session = request.getSession(false);
        Long uid = (Long) session.getAttribute("sessionId");

        return "main/index";
    }
}
