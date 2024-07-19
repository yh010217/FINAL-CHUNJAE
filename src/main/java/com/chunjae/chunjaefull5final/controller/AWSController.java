package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.service.AWSService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/file")
public class AWSController {
    private final AWSService S3Service;

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
}

