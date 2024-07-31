package com.chunjae.chunjaefull5final.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "paper_info")
@Setter @Getter
@NoArgsConstructor
public class PaperInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paper_id")
    private Long paperId;

    @Enumerated(EnumType.STRING)
    @Column(name = "paper_gubun")
    private PaperGubun paperGubun;

    @Column
    private String title;

    @Column(name = "item_count")
    private Integer itemCount;

    @Column
    private String grade;

    @Column
    private String term;

    @Column(name="created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    @LastModifiedDate
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

    @OneToMany(mappedBy = "paperInfo", orphanRemoval = true)
    private List<PaperQuestion> paperQuestions;


    @Builder
    public PaperInfo(Long paperId, PaperGubun paperGubun, String title, Integer itemCount, String grade, String term, LocalDateTime createdAt, LocalDateTime updatedAt, Character delete_yn, String saveName, String saveQuestionPath, String saveAnswerPath, String saveAllPath, Subject subject, User user) {
        this.paperId = paperId;
        this.paperGubun = paperGubun;
        this.title = title;
        this.itemCount = itemCount;
        this.grade = grade;
        this.term = term;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.delete_yn = delete_yn;
        this.saveName = saveName;
        this.saveQuestionPath = saveQuestionPath;
        this.saveAnswerPath = saveAnswerPath;
        this.saveAllPath = saveAllPath;
        this.subject = subject;
        this.user = user;
    }
}
