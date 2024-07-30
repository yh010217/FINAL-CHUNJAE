package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.dto.QuestionErrorDTO;
import com.chunjae.chunjaefull5final.jwt.JWTUtil;
import com.chunjae.chunjaefull5final.service.ModelService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
@Slf4j
public class ErrorController {

    private final ModelService service;
    private final JWTUtil jwtUtil;

    @PostMapping("/error")
    public String error(@RequestBody QuestionErrorDTO dto, Model model, HttpServletRequest request) {

        String attachmentFileName = dto.getAttachmentFileName();
        String attachmentFilePath = dto.getAttachmentFilePath();
        String content = dto.getContent();
        Integer itemId = dto.getItemId();
        String error_type = dto.getErrorType();
        Long uidByJWT = jwtUtil.getUidByRequest(request); // uid

        service.insertError(dto, uidByJWT);

        return "/step2";
    }



}