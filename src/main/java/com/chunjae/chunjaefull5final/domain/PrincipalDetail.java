package com.chunjae.chunjaefull5final.domain;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;
public class PrincipalDetail implements OAuth2User, UserDetails {

    private final User user;
    private final Map<String, Object> attributes;

    public PrincipalDetail(User user, Collection<? extends GrantedAuthority> authorities, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
    }

    @Override
    public String getName() {
        return user.getName();
    }
    public String getFullName() {
        return user.getFullName(); // User 객체의 getFullName() 메서드 호출
    }


    @Override
    public String getPassword() {
        return user.getPwd();
    }

    @Override
    public String getUsername() {
        return user.getEmail();  // 이메일을 반환하도록 수정
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

//public class PrincipalDetail implements OAuth2User, UserDetails {
//
//    private final User user;
//    private final Map<String, Object> attributes;
//
//    public PrincipalDetail(User user, Collection<? extends GrantedAuthority> authorities, Map<String, Object> attributes) {
//        this.user = user;
//        this.attributes = attributes;
//    }
//
//    @Override
//    public Map<String, Object> getAttributes() {
//        return attributes;
//    }
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
//    }
//
//    @Override
//    public String getName() {
//        return user.getName();
//    }
//
//    @Override
//    public String getPassword() {
//        return user.getPwd();
//    }
//
//    @Override
//    public String getUsername() {
//       return user.getEmail();
//    }
//    public String getFullName(){
//        return user.getName();
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//}
