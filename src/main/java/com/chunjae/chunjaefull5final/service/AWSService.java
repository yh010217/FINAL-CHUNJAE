package com.chunjae.chunjaefull5final.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
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
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.springframework.web.servlet.function.RequestPredicates.contentType;

@Service
@RequiredArgsConstructor
@Slf4j
public class AWSService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    public List<String> uploadFile(List<MultipartFile> multipartFiles, String folderName) {
        List<String> fileNameList = new ArrayList<>();
        log.info("file......{}",multipartFiles);
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

//    public byte[] getObject(String filepath) throws IOException {
//        S3Object s3Object = amazonS3.getObject(bucket, filepath);
//        try (S3ObjectInputStream s3is = s3Object.getObjectContent()) {
//            return s3is.readAllBytes();
//        }
//    }

    public S3Object downloadFile(String filePath) {
        GetObjectRequest getObjectRequest = new GetObjectRequest(bucket, filePath);
        return amazonS3.getObject(getObjectRequest);
    }
//    public S3Object downloadFile(String filePath) throws AmazonServiceException {
//        AmazonS3 s3Client = AmazonS3ClientBuilder.standard().build();
//        return s3Client.getObject(new GetObjectRequest(bucket, filePath));
//    }



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






}