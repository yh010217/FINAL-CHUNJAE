/*
package com.chunjae.chunjaefull5final.controller;

import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.nio.file.AccessDeniedException;

@ControllerAdvice
public class ExceptionController {

    // 예외 처리, 마지막에 주석 풀기

    @ExceptionHandler(Exception.class)
    public String except(Exception ex, Model model) {
        model.addAttribute("error_msg", ex);
        model.addAttribute("view", "error/error");
        return "main/index";
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNotFound(NoHandlerFoundException ex, Model model) {
        model.addAttribute("error_msg", "존재하지 않는 페이지입니다.");
        model.addAttribute("view", "error/404");
        return "main/index";
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public String handleAccessDenied(AccessDeniedException ex, Model model) {
        model.addAttribute("error_msg", "접근이 거부되었습니다.");
        model.addAttribute("view", "error/403");
        return "main/index";
    }

    // 추가적인 예외 처리 메소드 필요 시 여기에 추가
}
*/
