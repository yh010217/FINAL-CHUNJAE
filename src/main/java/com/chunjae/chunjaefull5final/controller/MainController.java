package com.chunjae.chunjaefull5final.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/index")
    public String main() {
        return "main/index";
    }
}
