//package com.chunjae.chunjaefull5final.config.oauth;
//
//import com.chunjae.chunjaefull5final.domain.PrincipalDetail;
//import com.chunjae.chunjaefull5final.domain.User;
//import com.chunjae.chunjaefull5final.domain.UserRole;
//import com.chunjae.chunjaefull5final.repository.User.UserRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//
//import java.util.Collections;
//import java.util.Map;
//import java.util.Optional;
//
//import static com.amazonaws.services.ec2.model.PrincipalType.Role;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class CustomOAuth2UserService extends DefaultOAuth2UserService {
//    private final UserRepository userRepository;
//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        log.info("--------------------------- OAuth2UserService ---------------------------");
//        OAuth2User oAuth2User = super.loadUser(userRequest);
//        Map<String, Object> attributes = oAuth2User.getAttributes();
//
//        log.info("OAuth2User = {}", oAuth2User);
//        log.info("attributes = {}", attributes);
//
//        String userNameAttributeName = userRequest.getClientRegistration()
//                .getProviderDetails()
//                .getUserInfoEndpoint()
//                .getUserNameAttributeName();
//        log.info("nameAttributeKey = {}", userNameAttributeName);
//
//        GoogleUserInfo googleUserInfo = new GoogleUserInfo(attributes);
//        String snsId = googleUserInfo.getSnsId();
//        String email = googleUserInfo.getEmail();
//        String name = googleUserInfo.getName();
//
//        Optional<User> bySnsId = userRepository.findBySnsId(snsId);
//        User user = bySnsId.orElseGet(() -> saveSnsUser(snsId, email, name));
//
//        return new PrincipalDetail(user, Collections.singleton(new SimpleGrantedAuthority(user.getRole().toString())),
//                attributes);
//    }
//    // 소셜 ID 로 가입된 사용자가 없으면 새로운 사용자를 만들어 저장한다
//    private User saveSnsUser(String snsId, String email, String name) {
//        log.info("--------------------------- saveSocialMember ---------------------------");
//        User user = new User();
//        user.setSnsId(snsId);
//        user.setEmail(email);
//        user.setName(name);
//        user.setSnsType("google");
//        user.setSnsType(snsId);
//        user.setRole(UserRole.User); // UserRole.User로 역할 설정
//        userRepository.save(user);
//        return user;
//    }
//
//}
