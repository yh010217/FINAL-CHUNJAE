package com.chunjae.chunjaefull5final.service.user;

import com.chunjae.chunjaefull5final.domain.SchoolType;
import com.chunjae.chunjaefull5final.domain.User;
import com.chunjae.chunjaefull5final.domain.UserRole;
import com.chunjae.chunjaefull5final.dto.UserDTO;
import com.chunjae.chunjaefull5final.repository.User.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

   private final UserRepository userRepository;
   private final PasswordEncoder encoder;
   private final ModelMapper modelMapper;
   private static final Logger log= LoggerFactory.getLogger(UserService.class);

    /** 이메일 중복체크*/
    public boolean findEmailCheck(String email) {
        log.info("email....{}", email);
        User findUser=userRepository.findByCheckEmail(email);
        log.info("findUser...{}", findUser);
        return findUser!=null;
    }
    /** 회원가입*/
    @Override
    public Long joinUser(UserDTO dto) {
        String pwd=encoder.encode(dto.getPwd());
        UserRole userRole=UserRole.valueOf(dto.getRole());

        SchoolType schoolType=SchoolType.valueOf(dto.getSchoolType());
        boolean findEmail=findEmailCheck(dto.getEmail());
        if (findEmail)
            throw  new RuntimeException("이미 사용 중입니다.");
        User user=User.builder()
                .email(dto.getEmail())
                .pwd(pwd)
                .name(dto.getName())
                .role(userRole)
                .schoolType(schoolType)
                .snsType(null)
                .snsId(null)
                .build();
        User userSave=userRepository.save(user);

        return userSave.getUid();
    }

    @Override
    public long findUidByEmail(String sessionId) {
        User user=userRepository.findByEmail(sessionId);
        long result=0;
        if (user!=null)
            result=user.getUid();
        return result;
    }

    @Override
    public Page<UserDTO> findUser(Pageable pageable, String search, String search_txt) {
        int totalPage=userRepository.getCount(search, search_txt);

        List<User> userList=new ArrayList<>();

        if (search=="email"||"email".equals(search)){
            userList=userRepository.finUsersEmail(pageable,search_txt);
        }else if (search=="name"||"name".equals(search)){
            userList=userRepository.finUserName(pageable, search_txt);
        }else {
            userList=userRepository.finUserName(pageable,search_txt);
        }


        List<UserDTO> userDTOList = new ArrayList<>();
        if(userList.isEmpty()){
            return new PageImpl<>(userDTOList, pageable, totalPage);
        }

        userDTOList = userList.stream()
                .map(item -> modelMapper.map(item, UserDTO.class))
                .collect(Collectors.toList());

        return new PageImpl<>(userDTOList, pageable, totalPage);
    }

    @Override
    public UserDTO getUserDetail(Long uid) {
        User user=userRepository.findUserDetail(uid);
        UserDTO dto= modelMapper.map(user, UserDTO.class);
        return dto;
    }

    @Override
    public Long deleteUser(Long uid) {
        userRepository.deleteUser(uid);
        return uid;
    }


}
