package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.dto.EvaluationDTO;
import com.chunjae.chunjaefull5final.dto.IdNameListDTO;
import com.chunjae.chunjaefull5final.dto.QuestionsDTO;
import com.chunjae.chunjaefull5final.jwt.JWTUtil;
import com.chunjae.chunjaefull5final.service.Step1Service;
import jakarta.servlet.http.HttpServletRequest;
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
    private final Step1Service step1Service;

    private final JWTUtil jwtUtil;

    @GetMapping("/step1/select-chapter/{subjectId}")
    public String selectChapter(@PathVariable Long subjectId, HttpServletRequest request, Model model){

        String chapterUrl = "https://tsherpa.item-factory.com/chapter/chapter-list";

        Long uid = jwtUtil.getUidByRequest(request);
        System.out.println(uid);

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
    public JSONObject makeExam(@RequestBody JSONObject body, @PathVariable Integer subject){
        JSONObject result;

        if(body == null){
            result = new JSONObject();
            result.put("enable","N");
            return result;
        }

        List<String> levelCnt = (List<String>) body.get("levelCnt");
        for(String level : levelCnt){
            System.out.println(level);
        }

        String url = "https://tsherpa.item-factory.com/item-img/chapters/item-list";
        ResponseEntity<String> examApi = step1Service.postRequest(url,body);
        if(examApi == null){
            result = new JSONObject();
            result.put("enable","N");
            return result;
        }

        String examBody = examApi.getBody();

        try {
            result = step1Service.saveExam(examBody,subject,levelCnt);
        }catch (ParseException e){
            System.out.println(e);
            result = new JSONObject();
            result.put("enable","N");
        }

        return result;
    }

    @PostMapping("/step1/save_questions")
    @ResponseBody
    public Map<String,Object> saveQuestions(@RequestBody JSONObject body){

        Map<String,Object> result = new HashMap<>();
        if(body == null){
            result = new JSONObject();
            result.put("enable","N");
            return result;
        }

        step1Service.saveQuestions(body);



        result.put("success","Y");
        return result;
    }

    @GetMapping("/step1/step2-go/{paperId}")
    public String step2Go(@PathVariable Long paperId){
        return "redirect:http://localhost:8080/step2/new/"+paperId;
    }
    @PostMapping("/step1/step2-data/{paperId}")
    @ResponseBody
    public Map<String,Object> step2Data(@PathVariable Long paperId){
        Map<String,Object> result = new HashMap<>();
        List<QuestionsDTO> itemList = step1Service.getQuestions(paperId);
        result.put("itemList",itemList);
        return result;
    }


}
