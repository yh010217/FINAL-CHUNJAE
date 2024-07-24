package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.service.TempPdfService;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

@Slf4j
@Controller
public class TempPdfController {

    private final TempPdfService tempPdfService;
    private final PdfUploadTest pdfTest;
    public TempPdfController(TempPdfService tempPdfService, PdfUploadTest pdfTest){
        this.tempPdfService = tempPdfService;
        this.pdfTest = pdfTest;
    }

    @GetMapping("/save_paper")
    public String savePaper(){
        return "/step3/save_paper";
    }

    @GetMapping("/api/pdftest/getImages/{paperId}/{type}")
    @ResponseBody
    public List<String> getImagesAPI(@PathVariable Long paperId
            , @PathVariable String type){
        List<StringBuilder> list = tempPdfService.toSendImages(paperId,type);
        List<String> strList
                = list.stream().map(item -> item.toString()).toList();

        return strList;
    }

    @GetMapping("/getImage/{type}/{imageId}/{imageDetail}")
    @ResponseBody
    public ResponseEntity<byte[]> getImage(@PathVariable String type
            ,@PathVariable String imageId, @PathVariable String imageDetail){

        String baseUrl = "https://img.chunjae-platform.com/upload/capture/tsherpa/"+type+"/"+imageId+"/"+imageDetail;

        System.out.println(baseUrl);

        try( InputStream svgInputStream = new URL(baseUrl).openStream();) {


            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = svgInputStream.read(buffer)) != -1) {
                byteArrayOutputStream.write(buffer, 0, bytesRead);
            }

            // 바이트 배열 생성
            byte[] imageBytes = byteArrayOutputStream.toByteArray();

            // HTTP 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "image/svg+xml"); // 이미지 타입에 맞게 설정 (예: image/jpeg)

            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        }catch (MalformedURLException me){
            System.out.println("url이 이상한듯?");
            System.out.println(me);
        }catch (IOException ie){
            System.out.println("stream 처리가 이상한듯?");
            System.out.println(ie);
        }

        return null;
    }



    @RequestMapping("/test")
    public void convertHtmlToPdf(HttpServletResponse response) throws IOException {
        // 입력 HTML 파일 경로
        String htmlFilePath = "D:\\FINAL-CHUNJAE\\src\\main\\resources\\templates\\step3\\save_paper.html";

        // ConverterProperties 생성
        ConverterProperties converterProperties = new ConverterProperties();

        // HTML을 PDF로 변환하여 HttpServletResponse에 출력
        try (OutputStream outputStream = response.getOutputStream()) {
            HtmlConverter.convertToPdf(new FileInputStream(htmlFilePath), outputStream, converterProperties);

            // 브라우저에 PDF 파일 전송
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=\"output.pdf\"");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}