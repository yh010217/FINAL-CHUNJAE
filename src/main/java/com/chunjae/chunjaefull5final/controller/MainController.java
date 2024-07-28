package com.chunjae.chunjaefull5final.controller;

import org.springframework.ui.Model;
import com.chunjae.chunjaefull5final.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import com.chunjae.chunjaefull5final.dto.UserDTO;
import com.chunjae.chunjaefull5final.service.user.CustomUserDetails;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MainController {

    private final UserService userService;

    @GetMapping("/index")
    public String main(HttpServletRequest request, Model model) {

        /** 상단바에 이름 뜨게 하기 */
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        System.out.println("Principal Class: " + principal.getClass().getName());
        if (principal instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) principal;
            String fullName = userDetails.getFullName();
            model.addAttribute("fullName", fullName);
        } else {
            model.addAttribute("fullName", "구글회원");
        }

        model.addAttribute("view","main/subject");
        return "main/index";
    }

    @GetMapping("/paper")
    public String paper(Model model) {

        /** 상단바에 이름 뜨게 하기 */
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        System.out.println("Principal Class: " + principal.getClass().getName());
        if (principal instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) principal;
            String fullName = userDetails.getFullName();
            model.addAttribute("fullName", fullName);
        } else {
            model.addAttribute("fullName", "구글회원");
        }
        
        model.addAttribute("view","main/paper");
        return "main/index";
    }
}