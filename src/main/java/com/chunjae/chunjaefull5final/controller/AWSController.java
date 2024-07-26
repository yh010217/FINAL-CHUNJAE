package com.chunjae.chunjaefull5final.controller;

/*
import com.chunjae.chunjaefull5final.service.AWSService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
*/

import com.chunjae.chunjaefull5final.service.AWSService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.net.URLEncoder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/file")
public class AWSController {
    private final AWSService S3Service;

    private static final Logger logger = LoggerFactory.getLogger(AWSController.class);

    /* @PostMapping("/uploadImageFile/{folderName}")
    public ResponseEntity<List<String>> uploadFile(
            List<MultipartFile> multipartFiles
            , @PathVariable String folderName
    ){
        return ResponseEntity.ok(S3Service.uploadFile(multipartFiles, folderName));
    }*/


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/uploadImageFile/{folderName}")
    public ResponseEntity<List<String>> uploadFile(
            List<MultipartFile> multipartFiles,
            @PathVariable String folderName
    ) {
        List<String> uploadedFiles = new ArrayList<>();
        for (MultipartFile file : multipartFiles) {
            String contentType = file.getContentType();
            if (true) { // 한글 뭔지 몰라서 그냥 true로 하고 js에서 막아둠
                uploadedFiles.addAll(S3Service.uploadFile(Collections.singletonList(file), folderName));
            } else {
                throw new IllegalArgumentException("Unsupported file type: " + contentType);
            }
        }
        return ResponseEntity.ok(uploadedFiles);
    }

    @DeleteMapping("/deleteImageFile")
    public ResponseEntity<String> deleteFile(@RequestParam String fileName){
        S3Service.deleteFile(fileName);
        return ResponseEntity.ok(fileName);
    }

    /** 폴더 바꿔야함*/
    private final String paperDFolderName="pdf_테스트폴더";
    @DeleteMapping("/paperDelete")
    public ResponseEntity<String>  paperDelete(@RequestParam String fileName){
        String filepath=paperDFolderName+"/"+fileName;
        S3Service.paperDeleteFile(filepath);
        return ResponseEntity.ok(filepath);
    }

    /** 오류사진 다운*/
    private final String folderName = "error"; // 폴더명 하드코딩
    @GetMapping("/download")
    public void downloadFile(@RequestParam("fileName") String fileName, HttpServletResponse response) {
        String filePath = folderName + "/" + fileName; // 폴더명과 파일명을 합쳐서 경로 생성
        try {
            String encodedFileName = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
            response.setHeader("Content-Disposition", "attachment; filename*=UTF-8''" + encodedFileName);
            String contentType = "application/octet-stream";
            if (fileName.endsWith(".png")) {
                contentType = "image/png";
            } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
                contentType = "image/jpeg";
            } else if (fileName.endsWith(".hwp")) {
                contentType = "application/hwp";
            } else if (fileName.endsWith(".pdf")) {
                contentType="application/pdf";
            } else if (fileName.endsWith(".txt")){
                contentType="application/txt";
            }else if (fileName.endsWith(".doc")){
                contentType="application/doc";
            }else if (fileName.endsWith(".docx")){
                contentType="application/docx";
            }
            response.setContentType(contentType);
            S3Service.downloadFile(filePath, response);
        } catch (IOException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            e.printStackTrace();
        }
    }
    /** 시험지 다운로드 파일명 임시! 고쳐야함!!*/
    private final String paperFolderName = "pdf_테스트폴더"; // 폴더명 하드코딩
    @GetMapping("/paperDownload")
    public void paperDownloadFile(@RequestParam("fileName") String fileName, HttpServletResponse response) {
        String filePath = paperFolderName + "/" + fileName; // 폴더명과 파일명을 합쳐서 경로 생성
        try {
            String encodedFileName = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
            response.setHeader("Content-Disposition", "attachment; filename*=UTF-8''" + encodedFileName);
            String contentType = "application/octet-stream";
            if (fileName.endsWith(".png")) {
                contentType = "image/png";
            } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
                contentType = "image/jpeg";
            } else if (fileName.endsWith(".hwp")) {
                contentType = "application/hwp";
            } else if (fileName.endsWith(".pdf")) {
                contentType = "application/pdf";
            }
            response.setContentType(contentType);
            S3Service.downloadFile(filePath, response);
        } catch (IOException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            e.printStackTrace();
        }
    }



    /** test용 */
    @GetMapping("/csv_download/{fileName}")
    public ResponseEntity<byte[]> download(@PathVariable String fileName) throws IOException {
        return S3Service.getObject(fileName);
    }

}

