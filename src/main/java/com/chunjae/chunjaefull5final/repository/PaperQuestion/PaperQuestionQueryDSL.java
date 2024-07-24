package com.chunjae.chunjaefull5final.repository.PaperQuestion;

import org.json.simple.JSONArray;

public interface PaperQuestionQueryDSL {
    void saveQuestions(JSONArray itemInfoList, Long paperId);
}
