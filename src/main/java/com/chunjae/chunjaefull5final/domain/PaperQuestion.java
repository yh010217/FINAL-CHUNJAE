package com.chunjae.chunjaefull5final.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "paper_question")
@Setter
@Getter
@NoArgsConstructor
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

    /*
    *`question_level` VARCHAR(5) NULL COMMENT '문항 난이도 코드',
  `large_chapter_id` BIGINT(20) NULL COMMENT '대단원 아이디',
  `large_chapter_name` VARCHAR(255) NULL COMMENT '대단원 명',
  `medium_chapter_id` INT(11) NULL COMMENT '중단원 아이디',
  `medium_chapter_name` VARCHAR(255) NULL COMMENT '중단원 명',
  `small_chapter_id` INT(11) NULL COMMENT '소단원 아이디',
  `small_chapter_name` VARCHAR(255) NULL COMMENT '소단원 명',
  `topic_chapter_id` INT(11) NULL COMMENT '토픽 아이디',
  `topic_chapter_name` VARCHAR(255) NULL COMMENT '토픽 명',
  `created_at` DATETIME NULL COMMENT '생성 날짜',
  `updated_at` DATETIME NULL COMMENT '업데이트 날짜',
  `delete_yn` CHAR(1) NULL COMMENT '삭제 여부 \'Y\' or \'N\'',
  * 이거로 엔티티 추가해줘, 변수 이름은 카멜케이스로
    * */

    @Column(name = "question_level")
    private String questionLevel;

    @Column(name = "large_chapter_id")
    private Long largeChapterId;

    @Column(name = "large_chapter_name")
    private String largeChapterName;

    @Column(name = "medium_chapter_id")
    private Integer mediumChapterId;

    @Column(name = "medium_chapter_name")
    private String mediumChapterName;

    @Column(name = "small_chapter_id")
    private Integer smallChapterId;

    @Column(name = "small_chapter_name")
    private String smallChapterName;

    @Column(name = "topic_chapter_id")
    private Integer topicChapterId;

    @Column(name = "topic_chapter_name")
    private String topicChapterName;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "delete_yn")
    private Character deleteYn;


}
