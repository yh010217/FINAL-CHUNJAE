package com.chunjae.chunjaefull5final.repository.PaperQuestion;


import com.chunjae.chunjaefull5final.domain.PaperQuestion;
import static com.chunjae.chunjaefull5final.domain.QPaperQuestion.*;
import static com.chunjae.chunjaefull5final.domain.QPaperInfo.*;
import com.chunjae.chunjaefull5final.dto.QuestionsDTO;
import com.querydsl.core.types.Projections;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class PaperQuestionQueryDSLImpl implements PaperQuestionQueryDSL {

    private final JPAQueryFactory queryFactory;

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    @Transactional
    @Modifying
    public void saveQuestions(List<Map<String,Object>> itemList, Long paperId) {

        StringBuilder sql = new StringBuilder();
        sql.append("INSERT INTO paper_question (paper_id,item_id, item_no, passage_id" +
                " , question_form_code, question_level" +
                ", large_chapter_id, large_chapter_name, medium_chapter_id, medium_chapter_name" +
                ", small_chapter_id, small_chapter_name, topic_chapter_id, topic_chapter_name" +
                ", passage_url, question_url, answer_url, explain_url) VALUES ");

        for(int i = 0 ; i < itemList.size() ; i ++){
            Map<String,Object> item = itemList.get(i);

            int itemId = (Integer)item.get("itemId");

            Integer tempPassageId = (Integer)item.get("passageId");
            Integer passageId = tempPassageId == null ? null : tempPassageId.intValue();
            String questionFormCode = (String)item.get("questionFormName");
            String questionLevel = (String)item.get("difficultyName");
            Integer largeChapterId = (Integer)item.get("largeChapterId");
            String largeChapterName = (String)item.get("largeChapterName");
            Integer mediumChapterId = (Integer)item.get("mediumChapterId");
            String mediumChapterName = (String)item.get("mediumChapterName");
            Integer smallChapterId = (Integer)item.get("smallChapterId");
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

    @Override
    public List<PaperQuestion> getQuestions(Long paperId) {

        List<PaperQuestion> list = queryFactory.select(paperQuestion)
                .from(paperQuestion)
                .where(paperQuestion.paperInfo.paperId.eq(paperId))
                .fetch();


        return list;
    }
}
