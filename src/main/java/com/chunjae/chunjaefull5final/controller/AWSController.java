package com.chunjae.chunjaefull5final.controller;

import com.amazonaws.services.s3.model.S3Object;
import com.chunjae.chunjaefull5final.service.AWSService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.HandlerMapping;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    @PostMapping("/uploadImageFile/{folderName}")
    public ResponseEntity<List<String>> uploadFile(
            List<MultipartFile> multipartFiles,
            @PathVariable String folderName
    ) {
        List<String> uploadedFiles = new ArrayList<>();
        for (MultipartFile file : multipartFiles) {
            String contentType = file.getContentType();
            if (contentType.startsWith("image/") || contentType.equals("application/hwp")) {
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
    @GetMapping("/csv_download/{fileName}")
    public ResponseEntity<byte[]> download(@PathVariable String fileName) throws IOException {
        return S3Service.getObject(fileName);
    }

    @GetMapping("/download/{filePath}")
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable String filePath) {
        try {
            // URL 디코딩을 통해 파일 경로를 정상적으로 처리
            String decodedFilePath = URLDecoder.decode(filePath, StandardCharsets.UTF_8.toString());
            logger.info("Decoded FilePath: {}", decodedFilePath);

            // S3에서 파일 다운로드
            S3Object s3Object = S3Service.downloadFile(decodedFilePath);
            InputStreamResource resource = new InputStreamResource(s3Object.getObjectContent());

            // 파일명 추출 및 헤더 설정
            String fileName = decodedFilePath.substring(decodedFilePath.lastIndexOf("/") + 1);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"");

            // ResponseEntity 생성
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(s3Object.getObjectMetadata().getContentLength())
                    .contentType(MediaType.parseMediaType(s3Object.getObjectMetadata().getContentType()))
                    .body(resource);
        } catch (Exception e) {
            logger.error("Error downloading file: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }


//    @DeleteMapping("/delete")
//    public ResponseEntity<Object> deletePdfFile(
//            @RequestParam(value = "uploadFilePath") String uploadFilePath,
//            @RequestParam(value = "uuidFileName") String uuidFileName) {
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .body(S3Service.deletePdfFile(uploadFilePath, uuidFileName));
//    }




}
