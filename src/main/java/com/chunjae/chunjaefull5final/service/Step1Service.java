package com.chunjae.chunjaefull5final.service;

import com.chunjae.chunjaefull5final.domain.PaperInfo;
import com.chunjae.chunjaefull5final.dto.EvaluationDTO;
import com.chunjae.chunjaefull5final.dto.IdNameListDTO;
import org.json.simple.JSONArray;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface Step1Service {
    String saveExam(String examBody, int subject) throws ParseException;

    PaperInfo tempPaperInfo(int subject, int itemCount, long user, String saveName);

    void saveQuestions(JSONArray itemList, Long paperId);

    List<EvaluationDTO> getEvalList(String evalBody);
    IdNameListDTO chapterGrouping(String chapterBody);
    ResponseEntity<String> postRequest(String url, Map<String, Object> requestBody);

}
