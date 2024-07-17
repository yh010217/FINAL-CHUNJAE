package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.dto.EvaluationDTO;
import com.chunjae.chunjaefull5final.dto.IdNameListDTO;
import com.chunjae.chunjaefull5final.service.Step1Service;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class Step1Controller {

    private final RestTemplate restTemplate;

    private final Step1Service step1Service;

    @GetMapping("/step1/select-chapter/{subjectId}")
    public String selectChapter(@PathVariable Long subjectId, Model model){

        String chapterUrl = "https://tsherpa.item-factory.com/chapter/chapter-list";


        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("subjectId",subjectId);

        ResponseEntity<String> chapterResponse = step1Service.postRequest(chapterUrl, requestBody);

        String chapterBody = chapterResponse.getBody();

        IdNameListDTO chapterGroup = step1Service.chapterGrouping(chapterBody);

        String subCurriName = chapterGroup.getName();
        String[] subCurri = subCurriName.split("#");
        String subject = subCurri[0];
        String curriculum = subCurri[1];


        String evaluationUrl = "https://tsherpa.item-factory.com/chapter/evaluation-list";
        ResponseEntity<String> evaluationResponse = step1Service.postRequest(evaluationUrl,requestBody);
        List<EvaluationDTO> evaluationList = step1Service.getEvalList(evaluationResponse.getBody());

        model.addAttribute("subject",subject);
        model.addAttribute("curriculum",curriculum);
        model.addAttribute("chapterGroup",chapterGroup);

        model.addAttribute("evaluationList",evaluationList);

        return "step1/select_chapter";
    }

    @PostMapping("step1/make_exam/{subject}")
    @ResponseBody
    public String makeExam(@RequestBody JSONObject body, @PathVariable Integer subject){
        String result;

        List<String> levelCnt = (List<String>) body.get("levelCnt");
        for(String level : levelCnt){
            System.out.println(level);
        }

        String url = "https://tsherpa.item-factory.com/item-img/chapters/item-list";
        ResponseEntity<String> examApi = step1Service.postRequest(url,body);
        String examBody = examApi.getBody();

        try {
            result = step1Service.saveExam(examBody,subject);
        }catch (ParseException e){
            System.out.println(e);
            result = "N";
        }

        return result;
    }

}