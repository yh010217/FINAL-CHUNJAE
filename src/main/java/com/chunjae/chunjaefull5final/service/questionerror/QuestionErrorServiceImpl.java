package com.chunjae.chunjaefull5final.service.questionerror;

import com.chunjae.chunjaefull5final.domain.QuestionError;
import com.chunjae.chunjaefull5final.dto.QuestionErrorDTO;
import com.chunjae.chunjaefull5final.repository.QuestionError.QuestionErrorRepository;
import com.chunjae.chunjaefull5final.service.paperinfo.PaperInfoService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionErrorServiceImpl implements QuestionErrorService {

    private final QuestionErrorRepository questionErrorRepository;
    private final ModelMapper modelMapper;

    private static final Logger log= LoggerFactory.getLogger(PaperInfoService.class);


    @Override
    public Page<QuestionErrorDTO> findError(Pageable pageable) {
        Page<QuestionError> questionErrorPage=questionErrorRepository.findAllError(pageable);
        List<QuestionErrorDTO> questionErrorDTOList = questionErrorPage.stream().map(item ->
                QuestionErrorDTO.builder()
                        .errorId(item.getErrorId())
                        .attachmentFileName(item.getAttachmentFileName())
                        .attachmentFilePath(item.getAttachmentFilePath())
                        .attachmentFileError(item.getAttachmentFileError())
                        .itemId(item.getItemId())
                        .errorType(item.getErrorType())
                        .uid(item.getUser().getUid())
                        .content(item.getContent())
                        .status(item.getStatus())
                        .build()).collect(Collectors.toList());
        return new PageImpl<>(questionErrorDTOList, pageable, questionErrorPage.getTotalElements());
    }

    @Override
    public QuestionErrorDTO getErrorDetail(Long errorId) {
        QuestionError questionError=questionErrorRepository.findErrorDetail(errorId);
        QuestionErrorDTO dto=modelMapper.map(questionError,QuestionErrorDTO.class);
        if (questionError.getUser()!=null){
            dto.setUid(questionError.getUser().getUid());
        }
        return dto;
    }

    @Override
    public int errorStatus(Long errorId) {
        try {
            Optional<QuestionError> questionErrorOptional = questionErrorRepository.findById(errorId);
            if (questionErrorOptional.isPresent()) {
                QuestionError questionError = questionErrorOptional.get();
                questionError.setStatus("yes"); // 상태를 "yes"로 변경
                questionErrorRepository.save(questionError); // 변경 사항 저장
                return 1;
            } else {
                return 0;
            }
        } catch (Exception e) {
            return 0;
        }
    }



}
