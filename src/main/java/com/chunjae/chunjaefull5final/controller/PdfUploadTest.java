package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.dto.PaperInfoDTO;
import com.chunjae.chunjaefull5final.service.S3Uploader;
import com.chunjae.chunjaefull5final.service.Step3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class PdfUploadTest {

    private final S3Uploader uploader;
    private final Step3Service service;

    @PostMapping("/upload")
    public @ResponseBody String pdfUpload(@RequestParam("pdfFile1") MultipartFile multipartFile1
            , @RequestParam("pdfFile2") MultipartFile multipartFile2
            , @RequestParam("pdfFile3") MultipartFile multipartFile3) throws IOException {

        String dirName = "pdf_테스트폴더";
        String upload = uploader.upload(multipartFile1, dirName);
        String upload2 = uploader.upload(multipartFile2, dirName);
        String upload3 = uploader.upload(multipartFile3, dirName);
//        PaperInfoDTO dto = new PaperInfoDTO();
//        dto.setSaveAllPath(upload);
//        dto.setSaveName(multipartFile.getOriginalFilename());
//        service.savePdf(dto);

        return upload;
    }
}
