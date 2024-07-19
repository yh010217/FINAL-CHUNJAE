package com.chunjae.chunjaefull5final.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "question_error")
@Setter
@Getter
@NoArgsConstructor
public class QuestionError {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "error_id")
    private Long errorId;

    @Column(name = "error_type")
    private String errorType;

    @Column(name = "attachment_file_name")
    private String attachmentFileName;

    @Column(name = "attachment_file_path")
    private String attachmentFilePath;

    @Column
    private String content;

    @Column
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid")
    private User user;

    @Column(name = "item_id")
    private Integer itemId;
    
    @Column(name = "attachment_file_error")
    private String AttachmentFileError;
}
