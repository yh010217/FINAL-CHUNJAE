package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;
import com.chunjae.chunjaefull5final.service.paperinfo.PaperService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
@RequiredArgsConstructor
@Slf4j
public class PaperController {

    private final PaperService paperService;


@GetMapping("/admin/paper")
public String adminPaper(@PageableDefault(size = 10, page = 0) Pageable pageable, Model model) {
    log.info("adminPaper 메서드 호출됨");
    Page<PaperInfoDTO> paperList = paperService.findPaper(pageable);
    log.info("paperService.findPaper 호출됨, 결과 개수: {}", paperList.getTotalElements());

    int pageBlock = 5;
    int startPage = (pageable.getPageNumber() / pageBlock) * pageBlock + 1;
    int endPage = startPage + pageBlock - 1;

    if (endPage >= paperList.getTotalPages()) {
        endPage = paperList.getTotalPages();
    }

    for (PaperInfoDTO dto : paperList) {
        log.info("...시험: {}", dto.getPaperId());
        log.info("...제목: {}", dto.getTitle());

    }

    model.addAttribute("pageable", pageable);
    model.addAttribute("pageList", paperList);
    model.addAttribute("startPage", startPage);
    model.addAttribute("endPage", endPage);
    return "admin/admin_paper";
}




}
