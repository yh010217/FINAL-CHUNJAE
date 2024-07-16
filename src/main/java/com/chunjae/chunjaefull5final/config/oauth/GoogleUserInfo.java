//package com.chunjae.chunjaefull5final.config.oauth;
//
//import java.util.Map;
//
//public class GoogleUserInfo {
//    public static String snsId;
//    private String email;
//
////    private String name;
//   // public static Map<String, Object> profile;
//
//    public GoogleUserInfo(Map<String, Object> attributes) {
//        snsId = String.valueOf(attributes.get("id"));
//        email = String.valueOf(attributes.get("email"));
//       // profile = (Map<String, Object>) profile.get("profile");
//    }
//    public String getSnsId() {
//        return snsId;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//    public String getName(){
//        return name;
//    }
//
////    public String getName() {
////        return String.valueOf(profile.get("name"));
////    }
//
//}
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

    public String getName() {
        return String.valueOf(attributes.get("name"));
    }
}
