package com.chunjae.chunjaefull5final.service.user;

import com.chunjae.chunjaefull5final.domain.User;
import com.chunjae.chunjaefull5final.repository.User.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;

@Slf4j
public class CustomUserDetails implements UserDetails {

    private User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    public String getRealName() {
        return user.getName();
    }

    @Override
    public String getPassword() {
        return user.getPwd();
    }

    public String getSnsId() {
        return user.getSnsId();
    }

    public Long getUid() {
        return user.getUid();
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
