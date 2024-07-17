package com.chunjae.chunjaefull5final.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long uid;
    @NotEmpty(message = "이메일을 입력하세요")
    private String email;
    @NotEmpty(message = "비밀번호는 필수 항목입니다.")
    @Size(min = 8, message = "비밀번호는 최소 8자 이상이어야 합니다.")
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
    private String pwd;
    @NotEmpty(message = "이름을 입력하세요")
    @Size(min = 1, max = 20, message = "이름은 1자 이상 20자 이하여야 합니다.")
    private String name;
    private String role;
    private String schoolType;
    private String snsType;
    private String snsId;

}
