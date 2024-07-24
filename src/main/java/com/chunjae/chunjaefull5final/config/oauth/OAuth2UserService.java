package com.chunjae.chunjaefull5final.config.oauth;

import com.chunjae.chunjaefull5final.domain.PrincipalDetail;
import com.chunjae.chunjaefull5final.domain.User;
import com.chunjae.chunjaefull5final.domain.UserRole;
import com.chunjae.chunjaefull5final.repository.User.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        Map<String, Object> attributes = oAuth2User.getAttributes();

        GoogleUserInfo googleUserInfo = new GoogleUserInfo(attributes);
        String snsId = googleUserInfo.getSnsId();
        String email = googleUserInfo.getEmail();
        String fullName = googleUserInfo.getFullName(); // 전체 이름을 가져옴

        // 이메일을 기준으로 사용자 찾기
        Optional<User> byEmail = Optional.ofNullable(userRepository.findByEmail(email));
        // SNS ID를 기준으로 사용자 찾기

        // SNS ID를 기준으로 사용자 찾기
        Optional<User> bySnsId = userRepository.findBySnsId(snsId);

        User user = byEmail.orElseGet(() -> {
            User newUser = bySnsId.orElseGet(() -> saveSnsUser(snsId, email, fullName));
            return userRepository.save(newUser);
        });

        return new PrincipalDetail(user, Collections.singleton(new SimpleGrantedAuthority(user.getRole().toString())), attributes);
    }

    // SNS 사용자 저장 메서드
    private User saveSnsUser(String snsId, String email, String fullName) {
        User newUser = new User();
        newUser.setSnsId(snsId);
        newUser.setEmail(email);
        newUser.setName(fullName);
        // 필요한 다른 필드들도 설정
        return userRepository.save(newUser);
    }


    //    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        log.info("--------------------------- OAuth2UserService ---------------------------");
//        OAuth2User oAuth2User = super.loadUser(userRequest);
//        Map<String, Object> attributes = oAuth2User.getAttributes();
//
//        log.info("OAuth2USer = {}", oAuth2User);
//        log.info("attributes = {}", attributes);
//
//        String userNameAttributeName = userRequest.getClientRegistration()
//                .getProviderDetails()
//                .getUserInfoEndpoint()
//                .getUserNameAttributeName();
//        log.info("nameAttributeKey = {}", userNameAttributeName);
//
//
//        GoogleUserInfo googleUserInfo=new GoogleUserInfo(attributes);
//        String snsId=googleUserInfo.getSnsId();
//        String email=googleUserInfo.getEmail();
//        String fullName = googleUserInfo.getFullName(); // 전체 이름을 가져옴
//
//        log.info("SNS ID: {}", snsId);
//        log.info("Email: {}", email);
//        log.info("Full Name: {}", fullName);
//
//
//        // String name=googleUserInfo.getName();
//        // 소셜 ID 로 사용자를 조회, 없으면 socialId 와 이름으로 사용자 생성
//        Optional<User> bySnsId = userRepository.findBySnsId(snsId);
//        //User user = bySnsId.orElseGet(() -> saveSnsUser(snsId, name));
//        User user = bySnsId.orElseGet(() -> saveSnsUser(snsId,email,fullName));
//
//        return new PrincipalDetail(user, Collections.singleton(new SimpleGrantedAuthority(user.getRole().toString())),
//                attributes);
//    }
    // 소셜 ID 로 가입된 사용자가 없으면 새로운 사용자를 만들어 저장한다
//    public User saveSnsUser(String snsId, String email, String fullName) {
//        log.info("--------------------------- saveSnsUser 시작 ---------------------------");
//        User newUser = User.builder()
//                .snsId(snsId)
//                .email(email)
//                .name(fullName)
//                .role(UserRole.User)
//                .snsType("google")
//                .build();
//        User savedUser = userRepository.save(newUser);
//        log.info("새로운 사용자 저장: {}", savedUser);
//        log.info("--------------------------- saveSnsUser 끝 ---------------------------");
//        return savedUser;
//    }

}