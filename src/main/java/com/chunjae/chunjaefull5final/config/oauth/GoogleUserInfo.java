package com.chunjae.chunjaefull5final.config.oauth;

import java.util.Map;

public class GoogleUserInfo {
    private Map<String, Object> attributes;

    public GoogleUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public String getSnsId() {
        return (String) attributes.get("sub"); // 구글 사용자 고유 ID
    }

    public String getEmail() {
        return (String) attributes.get("email");
    }

    public String getFullName() {
        return (String) attributes.get("name");
    }
}