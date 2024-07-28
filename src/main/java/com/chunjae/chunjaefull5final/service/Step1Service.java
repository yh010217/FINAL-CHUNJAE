package com.chunjae.chunjaefull5final.service;

import com.chunjae.chunjaefull5final.domain.PaperInfo;
import com.chunjae.chunjaefull5final.dto.EvaluationDTO;
import com.chunjae.chunjaefull5final.dto.IdNameListDTO;
import com.chunjae.chunjaefull5final.dto.QuestionsDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface Step1Service {
    JSONObject saveExam(String examBody, int subject, List<String> levelCnt) throws ParseException;

    PaperInfo tempPaperInfo(int subject, int itemCount, long user, String saveName);

    JSONObject makeQuestionsForm(JSONArray itemList, Long paperId, List<String> levelCnt);

    List<EvaluationDTO> getEvalList(String evalBody);
    IdNameListDTO chapterGrouping(String chapterBody);
    ResponseEntity<String> postRequest(String url, Map<String, Object> requestBody);

    void saveQuestions(JSONObject body) throws RuntimeException;

    List<QuestionsDTO> getQuestions(Long paperId);

    int getSubjectId(Long paperId);
}
