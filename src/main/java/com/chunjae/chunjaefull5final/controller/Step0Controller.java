package com.chunjae.chunjaefull5final.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
        return  "step0/step0";
    }

    /** 대단원 목록 파싱 */
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
                for(Map<String, Object> existingItem : parsedChapter) {
                    if (existingItem.get("largeChapterId").equals(largeChapterId)){
                        isDulicate = true;
                        break;
                    }
                }

                // 중복 아닐 때 추가
                if (!isDulicate) {
                    Map<String, Object> itemMap = new HashMap<>();

                    itemMap.put("curriculumCode", curriculumCode);
                    itemMap.put("curriculumName", curriculumName);
                    itemMap.put("subjectId", subjectId);
                    itemMap.put("subjectName", subjectName);
                    itemMap.put("largeChapterId", largeChapterId);
                    itemMap.put("largeChapterName", largeChapterName);

                    parsedChapter.add(itemMap);
                }
            }

        } catch (Exception e) {
            System.out.println(e);
            System.out.println("파싱 실패");
        }
        return parsedChapter;
    }

    /** 시험지 목록 파싱 */
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
            System.out.println(e);
            System.out.println("파싱 실패");
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

    /** 선택한 시험지 JSON 배열 형식으로 리액트에 넘기기 */
  /*  @PostMapping("/step0/examid")
    public List<Map<String, Object>> SendExamId(@RequestBody ) {

        List<Map<String,Object>> mapList = new ArrayList<>();

        try {


            for (int i = 0; i < mapList.size(); i++) {



            }

        }catch (Exception e){
            log.info();
            log.info("파싱 실패");
        }

        return mapList;
    }
*/

}
