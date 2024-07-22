package com.chunjae.chunjaefull5final.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionErrorDTO {
    private Long errorId;
    private String errorType;
    private String attachmentFileName;
    private String attachmentFilePath;
    private String attachmentFileError;
    private String content;
    private String status;
    private Long uid;
    private Integer itemId;

}
