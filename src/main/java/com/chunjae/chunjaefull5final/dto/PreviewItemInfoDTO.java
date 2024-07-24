package com.chunjae.chunjaefull5final.dto;

public class PreviewItemInfoDTO {
    private int itemNo;
    private Long itemId;
    private String difficultyName;
    private String largeChapterName;
    private String topicChapterName;
    private String answer;
    private String activityAreaName;
    private String contentAreaName;
    private String curriculumCompetencyName;
    private String achievementCode;

    public PreviewItemInfoDTO() {
    }

    public PreviewItemInfoDTO(int itemNo, Long itemId, String difficultyName, String largeChapterName, String topicChapterName, String answer, String activityAreaName, String contentAreaName, String curriculumCompetencyName, String achievementCode) {
        this.itemNo = itemNo;
        this.itemId = itemId;
        this.difficultyName = difficultyName;
        this.largeChapterName = largeChapterName;
        this.topicChapterName = topicChapterName;
        this.answer = answer;
        this.activityAreaName = activityAreaName;
        this.contentAreaName = contentAreaName;
        this.curriculumCompetencyName = curriculumCompetencyName;
        this.achievementCode = achievementCode;
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

    public String getDifficultyName() {
        return difficultyName;
    }

    public void setDifficultyName(String difficultyName) {
        this.difficultyName = difficultyName;
    }

    public String getLargeChapterName() {
        return largeChapterName;
    }

    public void setLargeChapterName(String largeChapterName) {
        this.largeChapterName = largeChapterName;
    }

    public String getTopicChapterName() {
        return topicChapterName;
    }

    public void setTopicChapterName(String topicChapterName) {
        this.topicChapterName = topicChapterName;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getActivityAreaName() {
        return activityAreaName;
    }

    public void setActivityAreaName(String activityAreaName) {
        this.activityAreaName = activityAreaName;
    }

    public String getContentAreaName() {
        return contentAreaName;
    }

    public void setContentAreaName(String contentAreaName) {
        this.contentAreaName = contentAreaName;
    }

    public String getCurriculumCompetencyName() {
        return curriculumCompetencyName;
    }

    public void setCurriculumCompetencyName(String curriculumCompetencyName) {
        this.curriculumCompetencyName = curriculumCompetencyName;
    }

    public String getAchievementCode() {
        return achievementCode;
    }

    public void setAchievementCode(String achievementCode) {
        this.achievementCode = achievementCode;
    }
}
