package com.chunjae.chunjaefull5final.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "paper_question")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaperQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pq_id")
    private Long pqId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paper_id")
    private PaperInfo paperInfo;

    @Column(name = "item_id")
    private Integer itemId;

    @Column(name = "item_no")
    private Integer itemNo;

    @Column(name = "passage_id")
    private Integer passageId;

    @Column(name = "set_paper_id")
    private Integer setPaperId;

    @Column(name = "set_paper_title")
    private String setPaperTitle;

    @Column(name = "question_form_code")
    private String questionFormCode;

    @Column(name = "question_level")
    private String questionLevel;

    @Column(name = "large_chapter_id")
    private Long largeChapterId;

    @Column(name = "large_chapter_name")
    private String largeChapterName;

    @Column(name = "medium_chapter_id")
    private Long mediumChapterId;

    @Column(name = "medium_chapter_name")
    private String mediumChapterName;

    @Column(name = "small_chapter_id")
    private Long smallChapterId;

    @Column(name = "small_chapter_name")
    private String smallChapterName;

    @Column(name = "topic_chapter_id")
    private Long topicChapterId;

    @Column(name = "topic_chapter_name")
    private String topicChapterName;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "delete_yn")
    private Character deleteYn;

    @Column(name = "passage_url")
    private String passageUrl;

    @Column(name = "question_url")
    private String questionUrl;

    @Column(name = "answer_url")
    private String answerUrl;

    @Column(name = "explain_url")
    private String explainUrl;

}
