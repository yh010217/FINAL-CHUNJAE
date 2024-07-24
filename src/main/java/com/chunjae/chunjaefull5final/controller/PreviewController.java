/*
package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.dto.ExamIdDTO;
import com.chunjae.chunjaefull5final.dto.ResponseType;
import com.chunjae.chunjaefull5final.service.PdfService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

@Controller
@RequiredArgsConstructor
@Slf4j
public class PreviewController {

    private final RestTemplate restTemplate;
    private final PdfService pdfService;

    @GetMapping("/preview/pdf-test")
    public String pdfDownload() {
        return "step0/pdf_test";
    }


    @PostMapping("/preview/all")
    public ResponseEntity<byte[]> previewAll(@RequestBody ExamIdDTO request) {
        String postUrl = "https://tsherpa.item-factory.com/exam/preview"; // 첫 번째 API URL

        try {
            // 첫 번째 API 호출
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<ExamIdDTO> requestEntity = new HttpEntity<>(request, headers);

            ResponseEntity<String> postResponse = restTemplate.exchange(postUrl, HttpMethod.POST, requestEntity, String.class);

            if (!postResponse.getStatusCode().is2xxSuccessful() || postResponse.getBody() == null) {
                throw new RuntimeException("preview URL fetch 실패 ..");
            }

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

            ResponseType responseType = objectMapper.readValue(postResponse.getBody(), ResponseType.class);

            // successYn 확인
            if (!"Y".equals(responseType.getSuccessYn())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }

            // previewUrl 확인
            String previewUrl = responseType.getPreviewUrl();
            if (previewUrl == null) {
                throw new RuntimeException("previewUrl is null ..");
            }
            System.out.println("preview URL: " + previewUrl); // URL 로그 출력

            // GET 요청으로 HTML 가져오기
            ResponseEntity<byte[]> getResponse = restTemplate.getForEntity(previewUrl, byte[].class);

            if (!getResponse.getStatusCode().is2xxSuccessful() || getResponse.getBody() == null) {
                throw new RuntimeException("HTML content fetch 실패..");
            }

            // 바이트 배열을 UTF-8로 디코딩
            String htmlContent = new String(getResponse.getBody(), StandardCharsets.UTF_8);

            // HTML 내용 수정 (특수 문자 변환)
            htmlContent = htmlContent.replaceAll("&nbsp;", " ")
                                        .replaceAll("<col(\\s[^>]*)?>", "<col></col>");

            // Noto Sans KR 폰트를 사용하는 CSS 추가
            String fontCss = "<style>" +
                    " body {     font-family: Open Sans, sans-serif; " +
                    "font-optical-sizing: auto; " +
                    "font-weight: 400; " +
                    "font-style: normal; " +
                    "font-variation-settings: wdth 100; + " +
                    "</style>}";

            htmlContent = "<head>" + fontCss + "</head>" + htmlContent;

            // PDF로 변환
            byte[] pdfBytes = pdfService.generatePdfFromHtml(htmlContent);

            // PDF 파일을 ResponseEntity로 반환
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.APPLICATION_PDF);
            responseHeaders.setContentDisposition(ContentDisposition.builder("attachment").filename("preview.pdf").build());

            return new ResponseEntity<>(pdfBytes, responseHeaders, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
*/
