package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.dto.PaperDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
public class Step3Controller {

/*    @PostMapping("/back/savedpaper")
    public ResponseEntity<String> reactTest(@RequestBody Map<String, Object> requestData) {

        log.info("paperContent...{}", requestData);

        return ResponseEntity.ok("Paper saved successfully");
    }*/

    @GetMapping("/loading")
    public String loading(){

        return "step3/loading";
    }

    @GetMapping("/save_comp")
    public String saveComp(){
        return "step3/save_comp";
    }

    @PostMapping("/save")
//    @CrossOrigin(origins = "http://10.41.1.61:8080")
    @CrossOrigin(origins = "http://43.201.252.185:80")
    public String savePaper(
            HttpServletResponse response,
            @RequestParam("paperTitle") String paperTitle,
            @RequestParam("paper") String paper,
            @RequestParam("subjectId") String subjectId,
            Model model
    ) throws JsonProcessingException {
//       log.info("paperTitle...{}", paperTitle);

        ObjectMapper objectMapper = new ObjectMapper();
        
        // JSON 배열을 List<PaperDTO>로 변환
        List<PaperDTO> itemList = objectMapper.readValue(paper
                , objectMapper.getTypeFactory().constructCollectionType(List.class, PaperDTO.class));

        // 데이터 확인
        for (PaperDTO item : itemList) {

            log.info("=====아이템 : {}", item.toString());
        }

        log.info("==========리스트 : {}", itemList);

        log.info("subjectId : {}", subjectId);

        model.addAttribute("saveName", paperTitle);
        model.addAttribute("paperList", paper);
        model.addAttribute("paperId", itemList.get(0).getPaperId());
        model.addAttribute("subjectId", subjectId);

        response.setHeader("X-Frame-Options", "ALLOW-FROM /loading");
        return "step3/save_paper";
    }

}
