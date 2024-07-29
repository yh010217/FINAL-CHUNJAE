package com.chunjae.chunjaefull5final.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Slf4j
public class Step3Controller {

    @PostMapping("/back/savedpaper")
    public ResponseEntity<String> reactTest(@RequestBody Map<String, Object> requestData) {

        log.info("paperContent...{}", requestData);

        return ResponseEntity.ok("Paper saved successfully");
    }
}
