package com.chunjae.chunjaefull5final.controller;

/*
import com.chunjae.chunjaefull5final.service.AWSService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
*/

import com.chunjae.chunjaefull5final.jwt.JWTUtil;
import com.chunjae.chunjaefull5final.service.AWSService;
import com.chunjae.chunjaefull5final.service.paperinfo.PaperInfoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.net.URLEncoder;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/file")
public class AWSController {
    private final AWSService S3Service;

    private final PaperInfoService paperInfoService;
    private final JWTUtil jwtUtil;

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
    @DeleteMapping("/fileDelete")
    public ResponseEntity<Map<String, Object>> deleteFile(@RequestParam String fileName, @RequestParam Long paperId) {
        String filepath = paperDFolderName + "/" + fileName;
        Map<String, Object> response = new HashMap<>();
        try {
            S3Service.paperDeleteFile(filepath);
            paperInfoService.updateQuestionPathToNull(paperId);

            response.put("success", true);
            response.put("filepath", filepath);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @DeleteMapping("/fileDelete2")
    public ResponseEntity<Map<String, Object>> paperDelete2(@RequestParam String fileName, @RequestParam Long paperId) {
        String filepath = paperDFolderName + "/" + fileName;
        try {
            S3Service.paperDeleteFile(filepath);
            paperInfoService.updateSaveAnswerPathToNull(paperId);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("filepath", filepath);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/fileDelete3")
    public ResponseEntity<Map<String, Object>> paperDelete3(@RequestParam String fileName, @RequestParam Long paperId) {
        String filepath = paperDFolderName + "/" + fileName;
        try {
            S3Service.paperDeleteFile(filepath);
            paperInfoService.updateAllPathToNull(paperId);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("filepath", filepath);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /** 오류사진 다운*/
    private final String folderName = "error"; // 폴더명 하드코딩
    @GetMapping("/download")
    public void downloadFile(@RequestParam("fileName") String fileName, HttpServletResponse response, HttpServletRequest request) {
        Long uidByJWT = jwtUtil.getUidByRequest(request); // uid
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
            S3Service.downloadFile(filePath, response, request, uidByJWT);
        } catch (IOException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            e.printStackTrace();
        }
    }

    /** 시험지 다운로드 파일명 임시! 고쳐야함!!*/
    private final String paperFolderName = "pdf_테스트폴더"; // 폴더명 하드코딩
    @GetMapping("/paperDownload")
    public void paperDownloadFile(@RequestParam("fileName") String fileName, HttpServletResponse response, HttpServletRequest request) {
        Long uidByJWT = jwtUtil.getUidByRequest(request); // uid
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
            S3Service.downloadFile(filePath, response, request, uidByJWT);
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

    @DeleteMapping("/paperDelete")
    public ResponseEntity<Map<String, Object>> deletePaper(@RequestParam String saveName, @RequestParam Long paperId) {
        String savePath = paperDFolderName + "/" + saveName;
        Map<String, Object> response = new HashMap<>();
        try {
            S3Service.paperDeleteFile(savePath+"_문제.pdf");
            S3Service.paperDeleteFile(savePath+"_정답,해설.pdf");
            S3Service.paperDeleteFile(savePath+"_.pdf");

            paperInfoService.deletePaper(paperId);

            response.put("success", true);
            response.put("filepath", savePath);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}

