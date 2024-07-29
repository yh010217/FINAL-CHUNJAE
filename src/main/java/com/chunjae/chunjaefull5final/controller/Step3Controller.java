package com.chunjae.chunjaefull5final.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
public class Step3Controller {

    @PostMapping("/back/savedpaper")
    public ResponseEntity<String> reactTest(@RequestBody Map<String, Object> requestData) {

        log.info("paperContent...{}", requestData);

        return ResponseEntity.ok("Paper saved successfully");
    }

    @GetMapping("/save_paper")
    public String savePaper(){
        return "/step3/save_paper";
    }

    @GetMapping("/loading")
    public String loading(){

        return "/step3/loading";
    }

    @GetMapping("/save_comp")
    public String saveComp(){
        return "/step3/save_comp";
    }

    @PostMapping("/save")
    @CrossOrigin(origins = "http://localhost:3000")
    public String postThymeleafPage(
            HttpServletResponse response,
            @RequestParam("title") String title,
//            @RequestParam("titlePaper") Map<String, Object> requestData,
            Model model
    ) {
        log.info("paperContent...{}", title);
        response.setHeader("X-Frame-Options", "ALLOW-FROM /loading");
//        log.info("=============name : {}==============", saveName);
//        model.addAttribute("saveName", saveName);
        return "/step3/save_paper";
    }

}
