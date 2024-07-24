package com.chunjae.chunjaefull5final.service;

import com.chunjae.chunjaefull5final.domain.QuestionError;
import com.chunjae.chunjaefull5final.domain.User;
import com.chunjae.chunjaefull5final.dto.QuestionErrorDTO;
import com.chunjae.chunjaefull5final.repository.ErrorRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ModalServiceImpl implements ModelService {

    private final ErrorRepository repository;
    private final ModelMapper modelMapper;

    @Override
    public void insertError(QuestionErrorDTO dto, Long uid) {
        // 새로운 QuestionError 객체 생성
        QuestionError newError = new QuestionError();

        // DTO의 값으로 새로운 객체 설정
        newError.setAttachmentFileName(dto.getAttachmentFileName());
        newError.setAttachmentFilePath(dto.getAttachmentFilePath());
        newError.setContent(dto.getContent());
        newError.setItemId(dto.getItemId());
        newError.setErrorType(dto.getErrorType());
        newError.setStatus("no");

        /** uid 값 받아와서 수정해야 함. */
        User user = new User();
        user.setUid(5L);
        newError.setUser(user); // User 객체 설정

        // 저장
        repository.save(newError);
    }

}

