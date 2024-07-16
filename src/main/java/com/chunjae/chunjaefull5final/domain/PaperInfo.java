package com.chunjae.chunjaefull5final.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "paper_info")
@Setter @Getter
@NoArgsConstructor
public class PaperInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paper_id")
    private Long paperId;

    @Column(name = "paper_gubun")
    private String paperGubun;

    @Column
    private String title;

    @Column(name = "item_count")
    private Integer itemCount;

    @Column
    private String grade;

    @Column
    private String term;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "delete_yn")
    private Character delete_yn;

    @Column(name = "save_name")
    private String saveName;

    @Column(name = "save_que_path")
    private String saveQuestionPath;

    @Column(name = "save_ans_path")
    private String saveAnswerPath;

    @Column(name = "save_all_path")
    private String saveAllPath;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid")
    private User user;
}
