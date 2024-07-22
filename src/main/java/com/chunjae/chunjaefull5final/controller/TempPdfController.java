package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.service.TempPdfService;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
