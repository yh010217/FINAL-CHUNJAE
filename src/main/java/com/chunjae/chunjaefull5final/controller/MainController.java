package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.dto.UserDTO;
import com.chunjae.chunjaefull5final.service.user.CustomUserDetails;
import com.chunjae.chunjaefull5final.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class MainController {

    @GetMapping("/index")
    public String main(Model model) {
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

        return "main/index"; // index.html 템플릿으로 이동
    }

}