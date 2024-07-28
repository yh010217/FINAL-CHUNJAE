package com.chunjae.chunjaefull5final.dto;


import com.chunjae.chunjaefull5final.domain.PaperInfo;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionsDTO {

    private Long pqId;

    private Long paperId;

    private Integer itemId;

    private Integer itemNo;

    private Integer passageId;

    private Integer setPaperId;

    private String setPaperTitle;

    private String questionFormCode;

    private String questionFormName;

    private String difficultyName;

    private Long largeChapterId;

    private String largeChapterName;

    private Long mediumChapterId;

    private String mediumChapterName;

    private Long smallChapterId;

    private String smallChapterName;

    private Long topicChapterId;

    private String topicChapterName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Character deleteYn;

    private String passageUrl;

    private String questionUrl;

    private String answerUrl;

    private String explainUrl;
}
