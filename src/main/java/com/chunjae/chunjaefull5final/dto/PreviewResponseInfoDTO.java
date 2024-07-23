package com.chunjae.chunjaefull5final.dto;

import java.util.List;

public class PreviewResponseInfoDTO {
    private String successYn;
    private List<PreviewItemInfoDTO> itemList; // List 추가
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

    public List<PreviewItemInfoDTO> getItemList() {
        return itemList;
    }

    public void setItemList(List<PreviewItemInfoDTO> itemList) {
        this.itemList = itemList;
    }
}
