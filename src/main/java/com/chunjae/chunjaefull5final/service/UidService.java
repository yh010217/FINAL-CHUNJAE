package com.chunjae.chunjaefull5final.service;

import com.chunjae.chunjaefull5final.domain.QuestionError;
import com.chunjae.chunjaefull5final.domain.User;
import com.chunjae.chunjaefull5final.repository.ErrorRepository;
import com.chunjae.chunjaefull5final.repository.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UidService {

    private final UserRepository userRepository;


    public UidService(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    public Long getCurrentUserUid() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                String username = ((UserDetails) principal).getUsername();
                return Long.valueOf(username); // Assuming username can be converted to Long
            } else {
                return Long.valueOf(principal.toString()); // Assuming principal.toString() can be converted to Long
            }
        }
        return null;
    }

    public User getCurrentUser() {
        Long uid = getCurrentUserUid();
        if (uid != null) {
            Optional<User> user = userRepository.findById(uid);
            return user.orElse(null);
        }
        return null;
    }


}
