package com.chunjae.chunjaefull5final.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageDTO {
    private String content;
    private Integer imageWidth;
    private Integer imageHeight;
}