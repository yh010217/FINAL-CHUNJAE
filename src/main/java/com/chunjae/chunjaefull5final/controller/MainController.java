package com.chunjae.chunjaefull5final.controller;

import org.springframework.ui.Model;
import com.chunjae.chunjaefull5final.service.user.UserService;
import com.sun.tools.jconsole.JConsoleContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@RequiredArgsConstructor
@Slf4j
public class MainController {

    private final UserService userService;

    @GetMapping("/index")
    public String main(HttpServletRequest request, Model model) {

        model.addAttribute("view","main/subject");
        return "main/index";
    }

    @GetMapping("/paper")
    public String paper(Model model) {
        model.addAttribute("view","main/paper");
        return "main/index";
    }
}
