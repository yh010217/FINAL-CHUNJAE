package com.chunjae.chunjaefull5final.dto;

import com.chunjae.chunjaefull5final.domain.PaperGubun;
import lombok.*;
import org.springframework.data.relational.core.sql.In;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaperInfoDTO {
    private Long paperId;
    private PaperGubun paperGubun;
    private String title;
    private Integer itemId;
    private Integer itemCount;
    private String grade;
    private String term;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
    private Character delete_yn;
    private String saveName;
    private String saveQuestionPath;
    private String saveAnswerPath;
    private String saveAllPath;
    private Integer subjectId;
    private Long uid;

}
