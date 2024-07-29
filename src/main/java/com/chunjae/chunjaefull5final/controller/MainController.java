package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.jwt.JWTUtil;
import com.sun.tools.jconsole.JConsoleContext;
import jakarta.servlet.http.Cookie;
import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;
import com.chunjae.chunjaefull5final.service.MainService;
import org.springframework.ui.Model;
import com.chunjae.chunjaefull5final.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import com.chunjae.chunjaefull5final.dto.UserDTO;
import com.chunjae.chunjaefull5final.service.user.CustomUserDetails;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.Principal;
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MainController {

    private final UserService userService;
    private final MainService mainService;

    private final JWTUtil jwtUtil;
    @GetMapping("/index")
    public String main(HttpServletRequest request, Model model) {

        /** 상단바에 이름 뜨게 하기 */
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        System.out.println("Principal Class: " + principal.getClass().getName());

        if (principal instanceof CustomUserDetails) { // CustomUSerDetails에서 user에 대한 get을 받아옴
            CustomUserDetails userDetails = (CustomUserDetails) principal;
            String fullName = userDetails.getFullName();
            Long uid = userDetails.getUid();
            System.out.println(uid + "아아ㅏ아아아아앙");
            log.info(uid + ">>>>>>>>>>>>>>> uid 값 확인하기");
            model.addAttribute("fullName", fullName);
            model.addAttribute("Uid", uid); // google 로그인이면 못 받아옴 => why?

        } else {
            model.addAttribute("fullName", "구글회원");
        }



        model.addAttribute("view","main/subject");
        return "main/index";
    }

    @GetMapping("/paper")
    public String paper(Model model) {

        /** 상단바에 이름 뜨게 하기 */
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        System.out.println("Principal Class: " + principal.getClass().getName());
        if (principal instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) principal;
            String fullName = userDetails.getFullName();
            model.addAttribute("fullName", fullName);
        } else {
            model.addAttribute("fullName", "구글회원");
        }

        /** 문항 다운로드하기 목록 불러오기 */
        Long uid = 5L; // 몰라서 하드코딩
        List<PaperInfoDTO> dto = mainService.getList(uid);
        model.addAttribute("dto", dto);
        log.info(dto.get(0).getSaveName() + "saveName 정보 얻어오기");
        log.info(dto.get(0).getUpdateAt() + "업데이트 정보 얻어오기");

        model.addAttribute("view","main/paper");
        return "main/index";
    }
}