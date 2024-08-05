package com.chunjae.chunjaefull5final.service;

/*
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
*/

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.chunjae.chunjaefull5final.domain.PaperDownloadLog;
import com.chunjae.chunjaefull5final.domain.PaperInfo;
import com.chunjae.chunjaefull5final.domain.User;
import com.chunjae.chunjaefull5final.repository.PaperDownloadLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AWSService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;
    private final PaperDownloadLogRepository repository;

    public List<String> uploadFile(List<MultipartFile> multipartFiles, String folderName) {
        List<String> fileNameList = new ArrayList<>();

        if (multipartFiles != null) {
            multipartFiles.forEach(file -> {
                String fileName = folderName+'/'+createFileName(file.getOriginalFilename());
                ObjectMetadata objectMetadata = new ObjectMetadata();
                objectMetadata.setContentLength(file.getSize());
                objectMetadata.setContentType(file.getContentType());

                try (InputStream inputStream = file.getInputStream()) {
                    // ACL 설정을 제거한 PutObjectRequest 생성
                    PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, fileName, inputStream, objectMetadata);
                    amazonS3.putObject(putObjectRequest);
                } catch (IOException e) {
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
                }
                fileNameList.add(fileName);
            });
        }else{
            log.info("UPLOAD ERROR multipartFile NULL");
        }

        return fileNameList;
    }


    public String createFileName(String fileName){
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName){
        try{
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }

    public void deleteFile(String fileName){
        System.out.println(">>>>>>>>> 버킷: "+bucket+"///파일 명:"+fileName);
        System.out.println(">>>>>>>>> "+bucket+fileName);
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));

    }

    public ResponseEntity<byte[]> getObject(String storedFileName) throws IOException {
    S3Object s3Object = amazonS3.getObject(new GetObjectRequest(bucket, storedFileName));
    S3ObjectInputStream objectInputStream = s3Object.getObjectContent();
    byte[] bytes = IOUtils.toByteArray(objectInputStream);
    objectInputStream.close();

    String fileName = URLEncoder.encode(storedFileName, "UTF-8").replaceAll("\\+", "%20");
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
    httpHeaders.setContentLength(bytes.length);
    httpHeaders.setContentDispositionFormData("attachment", fileName);

    return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
}

    public void downloadFile(String key, HttpServletResponse response, HttpServletRequest request, Long uidByJWT) throws IOException {
        S3Object s3Object = amazonS3.getObject(bucket, key);

        try (InputStream inputStream = s3Object.getObjectContent()) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                response.getOutputStream().write(buffer, 0, bytesRead);
            }
            response.getOutputStream().flush(); // 응답 스트림 플러시
        } catch (IOException e) {
            log.error("파일 다운로드 중 오류 발생", e);
            throw e; // 예외를 다시 던져서 호출자에게 알림
        } finally {
            // 다운로드 로그 저장
            LocalDateTime now = LocalDateTime.now();
            String clientIp = request.getRemoteAddr();
            String xForwardedFor = request.getHeader("X-Forwarded-For");
            if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
                clientIp = xForwardedFor.split(",")[0];
            }

            log.info("현재 시간: {}", now);
            log.info("클라이언트 IP 주소: {}", clientIp);

            PaperDownloadLog downloadLog = new PaperDownloadLog();
            downloadLog.setHostIp(clientIp);
            downloadLog.setCreatedAt(now);

            PaperInfo paperInfo = new PaperInfo();
            paperInfo.setPaperId(25L);
            downloadLog.setPaperInfo(paperInfo);

            User user = new User();
            user.setUid(uidByJWT);
            downloadLog.setUid(user);

            try {
                repository.save(downloadLog); // DB에 저장
            } catch (Exception e) {
                log.error("다운로드 로그 저장 중 오류 발생", e);
            }
        }
    }

    public void paperDeleteFile(String filepath) {
        try {
            System.out.println(">>>>>>>>> 버킷: " + bucket + "///파일 명:" + filepath);
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, filepath));
            System.out.println("파일이 성공적으로 삭제되었습니다.");
        } catch (AmazonServiceException e) {
            System.err.println("AmazonServiceException: " + e.getMessage());
            throw e;
        } catch (SdkClientException e) {
            System.err.println("SdkClientException: " + e.getMessage());
            throw e;
        }
    }

}

