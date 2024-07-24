package com.chunjae.chunjaefull5final.config.oauth;

import java.util.Map;

public class GoogleUserInfo {
    private Map<String, Object> attributes;

    public GoogleUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public String getSnsId() {
        return String.valueOf(attributes.get("sub")); // 구글의 사용자 ID는 "sub" 키에 저장됩니다.
    }

    public String getEmail() {
        return String.valueOf(attributes.get("email"));
    }

    public String getGivenName() {
        return String.valueOf(attributes.get("given_name"));
    }

    public String getFamilyName() {
        return String.valueOf(attributes.get("family_name"));
    }

    public String getFullName() {
        String givenName = getGivenName();
        String familyName = getFamilyName();
        return familyName + " " +givenName ; // 이름과 성을 합쳐 전체 이름을 생성
    }


}
