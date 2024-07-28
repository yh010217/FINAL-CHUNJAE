package com.chunjae.chunjaefull5final.service.user;

import com.chunjae.chunjaefull5final.domain.User;
import com.chunjae.chunjaefull5final.dto.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    boolean findEmailCheck(String email);

    Long joinUser(UserDTO dto);

    long findUidByEmail(String sessionId);

    Page<UserDTO> findUser(Pageable pageable, String search, String search_txt);

    UserDTO getUserDetail(Long uid);

    Long deleteUser(Long uid);

    UserDTO findUserInfo(String name);

    User snsUser(UserDTO dto);
}
