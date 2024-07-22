/*
package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.dto.IdNameListDTO;
import lombok.RequiredArgsConstructor;
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
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class Step1Controller {

    private final RestTemplate restTemplate;

    @GetMapping("/step1/select-chapter/{subjectId}")
    public String selectChapter(@PathVariable Long subjectId, Model model){

        String url = "https://tsherpa.item-factory.com/chapter/chapter-list";


        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("subjectId",subjectId);

        ResponseEntity<String> chapterResponse = postRequest(url, requestBody);

        String chapterBody = chapterResponse.getBody();

        IdNameListDTO chapterGroup = chapterGrouping(chapterBody);

        String subjectInfo = chapterGroup.getName();


        model.addAttribute("chapterGroup",chapterGroup);

        return "step1/select_chapter";
    }

    private IdNameListDTO chapterGrouping(String chapterBody){

        IdNameListDTO subjectList = null;

        try {

            JSONParser parser = new JSONParser();
            Object obj = parser.parse(chapterBody);
            JSONObject jsonObj = (JSONObject) obj;

            JSONArray chapterList = (JSONArray) jsonObj.get("chapterList");

            JSONObject subjectInfo = (JSONObject) chapterList.get(0);

            Long subjectId = (Long)subjectInfo.get("subjectId");
            String subjectName = (String)subjectInfo.get("subjectName");

            subjectList = new IdNameListDTO(subjectId,subjectName,new ArrayList<>());

            for(int i=0; i<chapterList.size(); i++){

                JSONObject item = (JSONObject) chapterList.get(i);

                Long largeChapterId = (Long)item.get("largeChapterId");
                String largeChapterName = (String)item.get("largeChapterName");
                Long mediumChapterId = (Long)item.get("mediumChapterId");
                String mediumChapterName = (String)item.get("mediumChapterName");
                Long smallChapterId = (Long)item.get("smallChapterId");
                String smallChapterName = (String)item.get("smallChapterName");
                Long topicChapterId = (Long)item.get("topicChapterId");
                String topicChapterName = (String)item.get("topicChapterName");


                List<IdNameListDTO> largeList = subjectList.getList();

                if(largeList.size() == 0 || !largeList.get(largeList.size() -1).getId().equals(largeChapterId)){
                    IdNameListDTO largeInl = new IdNameListDTO(largeChapterId,largeChapterName,new ArrayList());
                    largeList.add(largeInl);
                }

                IdNameListDTO largeChapter = largeList.get(largeList.size() - 1);


                List<IdNameListDTO> mediumList = largeChapter.getList();

                if(mediumList.size() == 0 || !mediumList.get(mediumList.size()-1).getId().equals(mediumChapterId)){
                    IdNameListDTO mediumInl = new IdNameListDTO(mediumChapterId,mediumChapterName,new ArrayList<>());
                    mediumList.add(mediumInl);
                }

                IdNameListDTO mediumChapter = mediumList.get(mediumList.size() - 1);


                List<IdNameListDTO> smallList = mediumChapter.getList();

                if(smallList.size() == 0 || !smallList.get(smallList.size()-1).getId().equals(smallChapterId)){
                    IdNameListDTO smallInl = new IdNameListDTO(smallChapterId,smallChapterName,new ArrayList<>());
                    smallList.add(smallInl);
                }

                IdNameListDTO smallChapter = smallList.get(smallList.size() - 1);


                List<IdNameListDTO> topicList = smallChapter.getList();
                topicList.add(new IdNameListDTO(topicChapterId,topicChapterName,null));

            }
            System.out.println("hello");
        }catch (Exception e){
            System.out.println(e);
            System.out.println("그루핑 실패");
        }
        return subjectList;
    }

    */
/** 리퀘스트바디 가져와서 post로 보내고 Response 받아오는 행위 *//*

    public ResponseEntity<String> postRequest(String url, Map<String, Object> requestBody){

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        return response;
    }

}
*/
