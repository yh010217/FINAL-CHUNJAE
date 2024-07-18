package com.chunjae.chunjaefull5final.repository.PaperQuestion;


import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@RequiredArgsConstructor
public class PaperQuestionQueryDSLImpl implements PaperQuestionQueryDSL {

    private final JPAQueryFactory queryFactory;

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    @Transactional
    @Modifying
    public void saveQuestions(JSONArray itemInfoList, Long paperId) {

        StringBuilder sql = new StringBuilder();
        sql.append("INSERT INTO paper_question (paper_id,item_id, item_no, passage_id" +
                " , question_form_code, question_level" +
                ", large_chapter_id, large_chapter_name, medium_chapter_id, medium_chapter_name" +
                ", small_chapter_id, small_chapter_name, topic_chapter_id, topic_chapter_name" +
                ", passage_url, question_url, answer_url, explain_url) VALUES ");

        for(int i = 0 ; i < itemInfoList.size() ; i ++){
            JSONObject item = (JSONObject) itemInfoList.get(i);

            int itemId = ((Long)item.get("itemId")).intValue();

            Long tempPassageId = (Long)item.get("passageId");
            Integer passageId = tempPassageId == null ? null : tempPassageId.intValue();
            String questionFormCode = (String)item.get("questionForm");
            String questionLevel = (String)item.get("difficultyName");
            Long largeChapterId = (Long)item.get("largeChapterId");
            String largeChapterName = (String)item.get("largeChapterName");
            Long mediumChapterId = (Long)item.get("mediumChapterId");
            String mediumChapterName = (String)item.get("mediumChapterName");
            Long smallChapterId = (Long)item.get("smallChapterId");
            String smallChapterName = (String)item.get("smallChapterName");
            Long topicChapterId = (Long)item.get("topicChapterId");
            String topicChapterName = (String)item.get("topicChapterName");
            String passageUrl = (String)item.get("passageUrl");
            String questionUrl = (String)item.get("questionUrl");
            String answerUrl = (String)item.get("answerUrl");
            String explainUrl = (String)item.get("explainUrl");

            if(i != 0) sql.append(" , ");

            sql.append("( " + paperId+ "," + itemId + "," + (i+1)
                    + "," + passageId + ",'" + questionFormCode + "','"
                    + questionLevel + "'," + largeChapterId + ",'"
                    + largeChapterName + "'," + mediumChapterId + ",'"
                    + mediumChapterName + "'," + smallChapterId + ",'"
                    + smallChapterName + "'," + topicChapterId + ",'"
                    + topicChapterName + "','" + passageUrl + "','"
                    + questionUrl + "','" + answerUrl + "','" + explainUrl + "')");
        }

        Query query = entityManager.createNativeQuery(sql.toString());

        query.executeUpdate();
    }
}
