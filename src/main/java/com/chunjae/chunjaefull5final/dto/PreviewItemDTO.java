package com.chunjae.chunjaefull5final.dto;

public class PreviewItemDTO {
    private int itemNo;
    private Long itemId;
    private String questionFormCode;
    private String questionFormName;
    private String difficultyCode;
    private String difficultyName;
    private Long largeChapterId;
    private String largeChapterName;
    private Long mediumChapterId;
    private String mediumChapterName;
    private Long smallChapterId;
    private String smallChapterName;
    private Long topicChapterId;
    private String topicChapterName;
    private String passageId;
    private String passageUrl;
    private String questionUrl;
    private String answerUrl;
    private String explainUrl;

    public PreviewItemDTO() {
    }

    public PreviewItemDTO(int itemNo, Long itemId, String questionFormCode, String questionFormName, String difficultyCode, String difficultyName, Long largeChapterId, String largeChapterName, Long mediumChapterId, String mediumChapterName, Long smallChapterId, String smallChapterName, Long topicChapterId, String topicChapterName, String passageId, String passageUrl, String questionUrl, String answerUrl, String explainUrl) {
        this.itemNo = itemNo;
        this.itemId = itemId;
        this.questionFormCode = questionFormCode;
        this.questionFormName = questionFormName;
        this.difficultyCode = difficultyCode;
        this.difficultyName = difficultyName;
        this.largeChapterId = largeChapterId;
        this.largeChapterName = largeChapterName;
        this.mediumChapterId = mediumChapterId;
        this.mediumChapterName = mediumChapterName;
        this.smallChapterId = smallChapterId;
        this.smallChapterName = smallChapterName;
        this.topicChapterId = topicChapterId;
        this.topicChapterName = topicChapterName;
        this.passageId = passageId;
        this.passageUrl = passageUrl;
        this.questionUrl = questionUrl;
        this.answerUrl = answerUrl;
        this.explainUrl = explainUrl;
    }

    public int getItemNo() {
        return itemNo;
    }

    public void setItemNo(int itemNo) {
        this.itemNo = itemNo;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getQuestionFormCode() {
        return questionFormCode;
    }

    public void setQuestionFormCode(String questionFormCode) {
        this.questionFormCode = questionFormCode;
    }

    public String getQuestionFormName() {
        return questionFormName;
    }

    public void setQuestionFormName(String questionFormName) {
        this.questionFormName = questionFormName;
    }

    public String getDifficultyCode() {
        return difficultyCode;
    }

    public void setDifficultyCode(String difficultyCode) {
        this.difficultyCode = difficultyCode;
    }

    public String getDifficultyName() {
        return difficultyName;
    }

    public void setDifficultyName(String difficultyName) {
        this.difficultyName = difficultyName;
    }

    public Long getLargeChapterId() {
        return largeChapterId;
    }

    public void setLargeChapterId(Long largeChapterId) {
        this.largeChapterId = largeChapterId;
    }

    public String getLargeChapterName() {
        return largeChapterName;
    }

    public void setLargeChapterName(String largeChapterName) {
        this.largeChapterName = largeChapterName;
    }

    public Long getMediumChapterId() {
        return mediumChapterId;
    }

    public void setMediumChapterId(Long mediumChapterId) {
        this.mediumChapterId = mediumChapterId;
    }

    public String getMediumChapterName() {
        return mediumChapterName;
    }

    public void setMediumChapterName(String mediumChapterName) {
        this.mediumChapterName = mediumChapterName;
    }

    public Long getSmallChapterId() {
        return smallChapterId;
    }

    public void setSmallChapterId(Long smallChapterId) {
        this.smallChapterId = smallChapterId;
    }

    public String getSmallChapterName() {
        return smallChapterName;
    }

    public void setSmallChapterName(String smallChapterName) {
        this.smallChapterName = smallChapterName;
    }

    public Long getTopicChapterId() {
        return topicChapterId;
    }

    public void setTopicChapterId(Long topicChapterId) {
        this.topicChapterId = topicChapterId;
    }

    public String getTopicChapterName() {
        return topicChapterName;
    }

    public void setTopicChapterName(String topicChapterName) {
        this.topicChapterName = topicChapterName;
    }

    public String getPassageId() {
        return passageId;
    }

    public void setPassageId(String passageId) {
        this.passageId = passageId;
    }

    public String getPassageUrl() {
        return passageUrl;
    }

    public void setPassageUrl(String passageUrl) {
        this.passageUrl = passageUrl;
    }

    public String getQuestionUrl() {
        return questionUrl;
    }

    public void setQuestionUrl(String questionUrl) {
        this.questionUrl = questionUrl;
    }

    public String getAnswerUrl() {
        return answerUrl;
    }

    public void setAnswerUrl(String answerUrl) {
        this.answerUrl = answerUrl;
    }

    public String getExplainUrl() {
        return explainUrl;
    }

    public void setExplainUrl(String explainUrl) {
        this.explainUrl = explainUrl;
    }
}
