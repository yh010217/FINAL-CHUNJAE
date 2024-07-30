package com.chunjae.chunjaefull5final.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PaperDTO {

    private Long pqId;
    private Long paperId;
    private Long itemId;
    private Long itemNo;
    private Long passageId;
    private Long setPaperId;
    private Long setPaperTitle;
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
    private Long index;
}
