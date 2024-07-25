package com.chunjae.chunjaefull5final.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactController {

    @GetMapping(value = {"/step2/{type}/{data}","/step2","step3"})
    public String reactForward() {
        return "forward:/index.html";
    }

}
