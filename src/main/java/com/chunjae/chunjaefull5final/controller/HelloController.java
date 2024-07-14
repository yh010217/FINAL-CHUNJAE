package com.chunjae.chunjaefull5final.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
public class HelloController {

    @GetMapping("/back/hello")
    public String test() {
        return "Hello, world!";
    }

    @PostMapping("/api/item-img/item-list")
    public ResponseEntity<String> apiTest(@RequestBody Map<String, Object> requestData) {
        // 예시로 요청 데이터를 받아서 처리하는 부분
        System.out.println("Received request data: " + requestData);

        // 요청 데이터를 추출하여 원격 서버로 전송
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestData, headers);

        // REST 템플릿을 사용하여 원격 서버로 POST 요청 전송
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                "https://tsherpa.item-factory.com/item-img/item-list",
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        // 처리 결과를 반환
        return responseEntity;
    }
}
