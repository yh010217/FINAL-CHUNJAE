package com.chunjae.chunjaefull5final.controller;


import com.chunjae.chunjaefull5final.dto.PreviewItemDTO;
import com.chunjae.chunjaefull5final.dto.PreviewResponseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
public class Step0Controller {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private List<String> seletedExamIds;    // 세션으로 ExamId 목록 받게 수정하기

    @GetMapping("/step0/{subjectId}")
    public String selectChapter(@PathVariable Long subjectId, Model model) {

        String url = "https://tsherpa.item-factory.com/chapter/chapter-list";
        String url2 = "https://tsherpa.item-factory.com/chapter/exam-list";

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("subjectId", subjectId);

        ResponseEntity<String> chapterResponse = postRequest(url, requestBody);
        ResponseEntity<String> examResponse = postRequest(url2, requestBody);

        String chapterBody = chapterResponse.getBody();
        String examBody = examResponse.getBody();

        // 대단원 목록
        List<Map<String, Object>> chapterList = chapterParsing(chapterBody);

        // 대단원 별 시험지 목록
        Map<Long, List<Map<String, Object>>> examList = examParsing(examBody);

        model.addAttribute("chapterList", chapterList);
        model.addAttribute("examList", examList);

//        return "step0/test0";
        return "step0/step0";
    }

    /**
     * 대단원 목록 파싱
     */
    private List<Map<String, Object>> chapterParsing(String chapterBody) {

        List<Map<String, Object>> parsedChapter = new ArrayList<>();
        try {

            JSONParser parser = new JSONParser();
            Object obj = parser.parse(chapterBody);
            JSONObject jsonObj = (JSONObject) obj;

            JSONArray chapterList = (JSONArray) jsonObj.get("chapterList");

            for (int i = 0; i < chapterList.size(); i++) {

                JSONObject item = (JSONObject) chapterList.get(i);

                String curriculumCode = (String) item.get("curriculumCode");
                String curriculumName = (String) item.get("curriculumName");
                Long subjectId = (Long) item.get("subjectId");
                String subjectName = (String) item.get("subjectName");
                Long largeChapterId = (Long) item.get("largeChapterId");
                String largeChapterName = (String) item.get("largeChapterName");

                // largeChaterId 중복 확인
                boolean isDulicate = false;
                for (Map<String, Object> existingItem : parsedChapter) {
                    if (existingItem.get("largeChapterId").equals(largeChapterId)) {
                        isDulicate = true;
                        break;
                    }
                }

                // 중복 아닐 때 추가
                if (!isDulicate) {
                    Map<String, Object> itemMap = new HashMap<>();
                    itemMap.put("curriculumName", curriculumName);
                    itemMap.put("subjectId", subjectId);
                    itemMap.put("subjectName", subjectName);
                    itemMap.put("largeChapterId", largeChapterId);
                    itemMap.put("largeChapterName", largeChapterName);

                    parsedChapter.add(itemMap);
                }
            }

        } catch (Exception e) {
            log.info("파싱 실패.....{}", e);

        }
        return parsedChapter;
    }

    /**
     * 시험지 목록 파싱
     */
    public Map<Long, List<Map<String, Object>>> examParsing(String examResponse) {

        Map<Long, List<Map<String, Object>>> groupedExams = new HashMap<>();
        try {

            JSONParser parser = new JSONParser();
            Object obj = parser.parse(examResponse);
            JSONObject jsonObj = (JSONObject) obj;

            JSONArray examList = (JSONArray) jsonObj.get("examList");

            for (int i = 0; i < examList.size(); i++) {
                JSONObject item = (JSONObject) examList.get(i);
                Long largeChapterId = (Long) item.get("largeChapterId");
                String largeChapterName = (String) item.get("largeChapterName");
                Long examId = (Long) item.get("examId");
                String examName = (String) item.get("examName");
                int itemCnt = Integer.parseInt(String.valueOf(item.get("itemCnt")));

                Map<String, Object> itemMap = new HashMap<>();
                itemMap.put("largeChapterId", largeChapterId);
                itemMap.put("largeChapterName", largeChapterName);
                itemMap.put("examId", examId);
                itemMap.put("examName", examName);
                itemMap.put("itemCnt", itemCnt);

                // largeChapterId 별로 그룹핑
                if (!groupedExams.containsKey(largeChapterId)) {
                    groupedExams.put(largeChapterId, new ArrayList<>());
                }
                groupedExams.get(largeChapterId).add(itemMap);
            }

        } catch (Exception e) {
            log.info("파싱 실패....{}", e);
        }
        return groupedExams;
    }

    /**
     * RequestBody 가져와서 post로 보내고 Response 받아오는 행위
     */
    public ResponseEntity<String> postRequest(String url, Map<String, Object> requestBody) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        return response;
    }

    /**
     * 선택한 시험지 json 형식으로 받고 보내기
     */
    @PostMapping("/step0/examid")
    public ResponseEntity<String> receiveExamIds(@RequestBody Map<String, List<String>> request) {

        seletedExamIds = request.get("examIdList");

        for (String item : seletedExamIds) {
            log.info("examid.....{}", item);
        }

        return ResponseEntity.ok("ExamId 받기 성공");
    }

    /**
     * 선택한 시험지들 STEP2(react)로 보내기
     */
    @GetMapping("/step0/examid")
    public ResponseEntity<Map<String, List<String>>> sendExamIds() {
        Map<String, List<String>> response = new HashMap<>();
        response.put("examIdList", seletedExamIds);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/preview/first")
    public ResponseEntity<PreviewResponseDTO> getPreview(@RequestBody PreviewResponseDTO request) {
        String url = "https://tsherpa.item-factory.com/item-img/exam/item-list";

        try {
            RestTemplate restTemplate = new RestTemplate();
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("examId", request.getExamId());
            ResponseEntity<PreviewResponseDTO> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    new HttpEntity<>(requestBody),
                    PreviewResponseDTO.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                PreviewResponseDTO previewResponse = response.getBody();
                String successYn = previewResponse.getSuccessYn();
                List<PreviewItemDTO> itemList = previewResponse.getItemList();

                request.setSuccessYn(successYn);
                request.setItemList(new ArrayList<>(itemList));
            } else {
                request.setSuccessYn("N");
                request.setItemList(null);
            }

        } catch (HttpClientErrorException e) {
            e.printStackTrace();
            request.setSuccessYn("N");
            request.setItemList(null);
        } catch (HttpServerErrorException e) {
            e.printStackTrace();
            request.setSuccessYn("N");
            request.setItemList(null);
        } catch (Exception e) {
            e.printStackTrace();
            request.setSuccessYn("N");
            request.setItemList(null);
        }

        return ResponseEntity.ok(request);
    }



 /*   @PostMapping("/preview/all")
    public ResponseEntity<String> previewAll(@RequestBody ExamIdDTO request) {
        String postUrl = "https://tsherpa.item-factory.com/exam/preview"; // 첫 번째 API URL

        try {
            // 첫 번째 API 호출
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<ExamIdDTO> requestEntity = new HttpEntity<>(request, headers);

            ResponseEntity<String> postResponse = restTemplate.exchange(postUrl, HttpMethod.POST, requestEntity, String.class);

            if (!postResponse.getStatusCode().is2xxSuccessful() || postResponse.getBody() == null) {
                throw new RuntimeException("preview URL fetch 실패 ..");
            }

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

            ResponseType responseType = objectMapper.readValue(postResponse.getBody(), ResponseType.class);

            // successYn 확인
            if (!"Y".equals(responseType.getSuccessYn())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Operation was not successful: " + responseType.getSuccessYn());
            }

            // previewUrl 확인
            String previewUrl = responseType.getPreviewUrl();
            if (previewUrl == null) {
                throw new RuntimeException("previewUrl is null ..");
            }

            System.out.println("preview URL: " + previewUrl); // URL 로그 출력
*//*

            // GET 요청으로 HTML 가져오기
            ResponseEntity<String> getResponse = restTemplate.getForEntity(previewUrl, String.class);

            if (!getResponse.getStatusCode().is2xxSuccessful() || getResponse.getBody() == null) {
                throw new RuntimeException("HTML content fetch 실패..");
            }

            // HTML 콘텐츠 반환
            return ResponseEntity.ok(getResponse.getBody());
*//*


            // GET 요청으로 HTML 가져오기
            ResponseEntity<byte[]> getResponse = restTemplate.getForEntity(previewUrl, byte[].class);

            if (!getResponse.getStatusCode().is2xxSuccessful() || getResponse.getBody() == null) {
                throw new RuntimeException("HTML content fetch 실패..");
            }

            // 바이트 배열을 UTF-8로 디코딩
            String htmlContent = new String(getResponse.getBody(), StandardCharsets.UTF_8);

            // HTML 콘텐츠 반환, 인코딩을 UTF-8로 설정
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.TEXT_HTML); // 텍스트 HTML 타입으로 설정
            responseHeaders.setContentType(new MediaType("text", "html", StandardCharsets.UTF_8)); // UTF-8 설정

            return new ResponseEntity<>(htmlContent, responseHeaders, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("미리보기 fetch 실패 ..");
        }
    }*/


}















