package com.chunjae.chunjaefull5final.repository.User;


import com.chunjae.chunjaefull5final.dto.UserDTO;

public interface UserQueryDSL {

    int getCount(String search, String search_txt);


    UserDTO findUserInfo(long uidByEmail);
}
