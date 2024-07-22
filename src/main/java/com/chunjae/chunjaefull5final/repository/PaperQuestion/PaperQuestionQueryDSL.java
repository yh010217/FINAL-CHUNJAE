package com.chunjae.chunjaefull5final.repository.PaperQuestion;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface PaperQuestionQueryDSL {
    void saveQuestions(List<Map<String,Object>> itemInfoList, Long paperId);
}
