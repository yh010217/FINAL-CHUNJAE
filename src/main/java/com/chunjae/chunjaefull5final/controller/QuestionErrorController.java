package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.dto.QuestionErrorDTO;
import com.chunjae.chunjaefull5final.service.questionerror.QuestionErrorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@Slf4j
public class QuestionErrorController {

    private final QuestionErrorService questionErrorService;

    @GetMapping("/admin/error")
    public String adminError(@PageableDefault(size = 10, page = 0)Pageable pageable, Model model){
        Page<QuestionErrorDTO> questionList=questionErrorService.findError(pageable);

        int pageBlock=5;
        int startPage=(pageable.getPageNumber()/pageBlock)*pageBlock+1;
        int endPage=startPage+pageBlock-1;

        if (endPage >= questionList.getTotalPages()) {
            endPage = questionList.getTotalPages();
        }
        model.addAttribute("pageable", pageable);
        model.addAttribute("questionList",questionList);
        model.addAttribute("startPage",startPage);
        model.addAttribute("endPage",endPage);

        return "admin/admin_error";

    }
    @GetMapping("/admin/errordetail/{errorId}")
    public String errorAdminDetail(@PathVariable Long errorId, Model model){
        QuestionErrorDTO questionErrorDTO=questionErrorService.getErrorDetail(errorId);
        if (questionErrorDTO!=null){
            System.out.println("error uid"+questionErrorDTO.getUid());
        }else {
            System.out.println("Question not for errorId: "+errorId);
        }
        model.addAttribute("questionErrorDTO",questionErrorDTO);
        return "admin/error_detail";

    }
    @GetMapping("/errorstatus/{errorId}")
    public ResponseEntity<String> errorStatus(@PathVariable Long errorId){
        int result=questionErrorService.errorStatus(errorId);
        String msg= result == 1 ? "처리완료" : "처리오류";
        return ResponseEntity.ok().body(msg);
    }





}
