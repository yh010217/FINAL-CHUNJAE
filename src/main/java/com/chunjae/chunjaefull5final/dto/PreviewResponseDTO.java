package com.chunjae.chunjaefull5final.dto;

import java.util.List;

public class PreviewResponseDTO {
    private String successYn;
    private List<PreviewItemDTO> itemList; // itemList 필드 추가
    private Long examId;

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public String getSuccessYn() {
        return successYn;
    }

    public void setSuccessYn(String successYn) {
        this.successYn = successYn;
    }

    public List<PreviewItemDTO> getItemList() {
        return itemList;
    }

    public void setItemList(List<PreviewItemDTO> itemList) {
        this.itemList = itemList;
    }
}
