package com.chunjae.chunjaefull5final.dto;

/* 미리보기 - 시험지 ID, 시험지 type */
public class ExamIdDTO {

    private String examId;  // 시험지 ID
    private String differentiation; // 시험지 미리보기 type

    public ExamIdDTO() {
    }

    public ExamIdDTO(String examId, String differentiation) {
        this.examId = examId;
        this.differentiation = differentiation;
    }

    public String getExamId() {
        return examId;
    }

    public void setExamId(String examId) {
        this.examId = examId;
    }

    public String getDifferentiation() {
        return differentiation;
    }

    public void setDifferentiation(String differentiation) {
        this.differentiation = differentiation;
    }
}
