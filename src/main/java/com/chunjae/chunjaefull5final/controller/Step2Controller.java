package com.chunjae.chunjaefull5final.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@Slf4j
public class Step2Controller {

    /** STEP2 문제목록 api 호출 **/
    @PostMapping("/api/item-img/exam-list/item-list")
    public ResponseEntity<String> examList(@RequestBody Map<String, Object> requestData) {
        // 예시로 요청 데이터를 받아서 처리하는 부분
//        System.out.println("Received request data: " + requestData);

        // 요청 데이터를 추출하여 원격 서버로 전송
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestData, headers);

        // REST 템플릿을 사용하여 원격 서버로 POST 요청 전송
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                "https://tsherpa.item-factory.com/item-img/exam-list/item-list",
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        // 처리 결과를 반환
        return responseEntity;
    }

    @PostMapping("/item-img/exam-list/item-list")
    public ResponseEntity<String> examIdList(@RequestBody Map<String, Object> requestData) {
        // 예시로 요청 데이터를 받아서 처리하는 부분
//        System.out.println("Received request data: " + requestData);

        // 요청 데이터를 추출하여 원격 서버로 전송
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestData, headers);

        // REST 템플릿을 사용하여 원격 서버로 POST 요청 전송
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                "https://tsherpa.item-factory.com/item-img/exam-list/item-list",
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        // 처리 결과를 반환
        return responseEntity;
    }

    /** STEP2 subjectId 호출 **/
    @PostMapping("/api/chapter/chapter-list")
    public ResponseEntity<String> chapterList(@RequestBody Map<String, Object> requestData) {
        // 예시로 요청 데이터를 받아서 처리하는 부분
//        System.out.println("Received request data: " + requestData);

        // 요청 데이터를 추출하여 원격 서버로 전송
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestData, headers);

        // REST 템플릿을 사용하여 원격 서버로 POST 요청 전송
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                "https://tsherpa.item-factory.com/chapter/chapter-list",
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        // 처리 결과를 반환
        return responseEntity;
    }

    /** STEP2 유사문제 api 호출 **/
    @PostMapping("/api/item-img/similar-list")
    public ResponseEntity<String> apiSimilar(@RequestBody Map<String, Object> requestData) {
        // 예시로 요청 데이터를 받아서 처리하는 부분
//        System.out.println("Received request data: " + requestData);

        // 요청 데이터를 추출하여 원격 서버로 전송
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestData, headers);

        // REST 템플릿을 사용하여 원격 서버로 POST 요청 전송
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                "https://tsherpa.item-factory.com/item-img/similar-list",
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        // 처리 결과를 반환
        return responseEntity;
    }

}
