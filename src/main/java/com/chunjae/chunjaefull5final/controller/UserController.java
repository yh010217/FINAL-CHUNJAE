package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.dto.UserDTO;

import com.chunjae.chunjaefull5final.service.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@Controller
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;


    /** 회원가입페이지이동 */
    @GetMapping("/join")
    public String join(Model model){
        model.addAttribute("userDTO", new UserDTO());
        return "user/join";
    }
    /** 회원가입 */
    @PostMapping("/join")
    public String joinResult(@Valid @ModelAttribute UserDTO dto, BindingResult bindingResult, Model model) {
        boolean emailCheck = userService.findEmailCheck(dto.getEmail());
        if (emailCheck) {
            model.addAttribute("joinError", "joinError");
            model.addAttribute("dto", dto);
            return "user/join";
        } else if (bindingResult.hasErrors()) {
            model.addAttribute("dto", dto); // 유효성 검사 오류 시에도 dto를 모델에 추가하여 폼에 다시 표시
            return "user/join";
        }
        Long uid = userService.joinUser(dto);
        return "redirect:/login";
    }

    /** 이메일 중복체크 */
    @GetMapping("/checkEmail")
    public @ResponseBody String checkEmail(@RequestParam(required = false) String email) {
        if (email == null || email.isEmpty()) {
            return "null";
        }
        boolean findEmail = userService.findEmailCheck(email);
        return findEmail ? "true" : "false";
    }

    @GetMapping("/login")
    public String login(@RequestParam(name = "error",required = false) String error, Model model){
        if (error!=null){
            model.addAttribute("loginError","loginError");
        }
        return "user/login";
    }
    @GetMapping("/admin/user")
    public String adminUser(@PageableDefault(size = 10, page = 0) Pageable pageable
            , @RequestParam(required = false, defaultValue = "") String search
            , @RequestParam(required = false, defaultValue = "")String search_txt
            , Model model){
        if (search_txt==null)
            search_txt="";

        Page<UserDTO> userList=userService.findUser(pageable,search,search_txt);

        int pageBlock=5;
        int startPage=(pageable.getPageNumber()/pageBlock)*pageBlock+1;
        int endPage=startPage+pageBlock-1;

        if (endPage>=userList.getTotalPages())
            endPage=userList.getTotalPages();

        for (UserDTO dto:userList){
            log.info("...회원:{}", dto.getEmail());
        }
        model.addAttribute("pageable", pageable);
        model.addAttribute("userList", userList);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);
        model.addAttribute("search", search);
        model.addAttribute("search_txt", search_txt);

//        return "admin/user";
        return "admin/admin_user";
    }
    @GetMapping("/admin/userdetail/{uid}")
    public String userAdminDetail(@PathVariable Long uid, Model model){
        UserDTO userDTO = userService.getUserDetail(uid);
        model.addAttribute("userDTO", userDTO);
        return "admin/user_detail";
    }
    @GetMapping("/userdelete/{uid}")
    public String deleteUser(@PathVariable Long uid){
        Long id = userService.deleteUser(uid);
        return "redirect:/admin/user";
    }
    @GetMapping("/userdetail/{uid}")
    @ResponseBody
    public UserDTO userAdminDetail(@PathVariable Long uid){
        UserDTO userDTO = userService.getUserDetail(uid);
        return userDTO;
    }





}
