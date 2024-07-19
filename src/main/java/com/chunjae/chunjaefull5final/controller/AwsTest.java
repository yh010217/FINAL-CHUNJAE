package com.chunjae.chunjaefull5final.controller;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class AwsTest {


    private final AmazonS3Client amazonS3Client;

    @GetMapping("/s3test/s3upload")
    public String s3UploadTest(){


        return "s3test/upload";
    }

    @PostMapping("/s3test/upload-result")
    public String s3UploadResultTest(@RequestParam MultipartFile upload){

        String originalName = upload.getOriginalFilename();
        String filePath = "C:\\Users\\user\\Desktop\\s3saveTest";

        File localFile = uploading2(filePath, upload);
        String fileName = localFile.getName();


        String bucket = "kdt-java-5";
        //String fileLoc = "http://localhost:8080/getImage/"+fileName;
        PutObjectResult result = amazonS3Client
                .putObject(new PutObjectRequest(bucket, fileName, localFile));
        String s3Url = amazonS3Client.getUrl(bucket, fileName).toString();


        String key =  s3Url.split("https://kdt-java-5.s3.ap-northeast-2.amazonaws.com/")[1];

        String s3KeyName = key.replace("%25","%");

        System.out.println(s3KeyName);

        return "redirect:/s3test/download-page/"+s3KeyName;
    }

    private File uploading2(String filePath, MultipartFile image) {

        UUID uuid = UUID.randomUUID();
        String fileName = image.getOriginalFilename();

        fileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8)
                .replace("+", "%20");

        fileName = uuid + "_" + fileName;

        File save = new File(filePath, fileName);

        try {
            image.transferTo(save);
        } catch (IOException e) {
            save.delete();
            throw new RuntimeException();
        }
        return save;
    }


    @GetMapping("/s3test/download-page/{keyName}")
    public String s3Test(@PathVariable String keyName , Model model){
        model.addAttribute("key",keyName);
        return "step1/s3test";
    }

    @GetMapping("/download-file/{keyName}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String keyName
            ,HttpServletRequest request, HttpServletResponse response){


        String bucket = "kdt-java-5";
        String key_name = URLEncoder.encode(keyName, StandardCharsets.UTF_8)
                .replace("+", "%20");
        S3Object object = amazonS3Client.getObject(bucket, key_name);


        String localSave = "C:\\Users\\user\\Desktop\\s3saveDownload";

        String fname= URLEncoder.encode(key_name, StandardCharsets.UTF_8).replace("+","%20");


        File file=new File(localSave+"\\" + fname);

        try {
            S3ObjectInputStream s3is = object.getObjectContent();
            FileOutputStream fos = new FileOutputStream(file);
            byte[] read_buf = new byte[1024];
            int read_len = 0;
            while ((read_len = s3is.read(read_buf)) > 0) {
                fos.write(read_buf, 0, read_len);
            }
            s3is.close();
            fos.close();
        } catch (AmazonServiceException e) {
            System.err.println(e.getErrorMessage());
            System.exit(1);
        } catch (FileNotFoundException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        } catch (IOException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }

        if(!file.exists()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        HttpHeaders headers = new HttpHeaders();

        Resource resource;
        try {
            resource= new InputStreamResource(new FileInputStream(file));
            response.setHeader("Content-Type", "application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; filename="+localSave+"\\"+fname);
            headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
            headers.add("Pragma", "no-cache");
            headers.add("Expires", "0");
            headers.add("contentType","utf-8");
            headers.setContentLength(file.length());
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        } catch(IOException e)
        {
            System.out.println("error....."+e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>( resource, headers, HttpStatus.OK);
    }
}
