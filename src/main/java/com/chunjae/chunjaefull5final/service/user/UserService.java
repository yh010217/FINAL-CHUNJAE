package com.chunjae.chunjaefull5final.service.user;

import com.chunjae.chunjaefull5final.dto.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    boolean findEmailCheck(String email);

    int joinUser(UserDTO dto);

    int findUidByEmail(String sessionId);

    Page<UserDTO> findUser(Pageable pageable, String search, String search_txt);

//    User snsUser(UserDTO dto);
}
