package com.chunjae.chunjaefull5final.service.user;

import com.chunjae.chunjaefull5final.domain.PrincipalDetail;
import com.chunjae.chunjaefull5final.domain.User;
import com.chunjae.chunjaefull5final.repository.User.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User findUser=userRepository.findByEmail(email);

        if (findUser!=null)
            return new CustomUserDetails(findUser);
        return null;
    }



}
