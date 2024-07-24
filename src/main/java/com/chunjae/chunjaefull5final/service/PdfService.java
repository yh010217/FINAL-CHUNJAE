package com.chunjae.chunjaefull5final.service;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.FontProvider;
import com.itextpdf.text.pdf.BaseFont;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.xhtmlrenderer.pdf.ITextFontResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;


import java.io.ByteArrayOutputStream;
import java.io.IOException;


@Service
@Slf4j
public class PdfService {

    public byte[] generatePdfFromHtml(String html) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            ITextRenderer renderer = new ITextRenderer();
            ITextFontResolver fontResolver = renderer.getFontResolver();

            fontResolver.addFont("../resources/static/font/OpenSans-VariableFont_wdth,wght.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);

            renderer.setDocumentFromString(html);
            renderer.layout();
            renderer.createPDF(outputStream);
            return outputStream.toByteArray();
        } catch (IOException e) {
            log.error("IO 예외 발생: {}", e.getMessage());
            throw new RuntimeException("PDF 생성 중 IO 오류 발생", e);
        } catch (DocumentException e) {
            log.error("문서 생성 예외 발생: {}", e.getMessage());
            throw new RuntimeException("PDF 생성 중 문서 오류 발생", e);
        } catch (Exception e) {
            log.error("예외 발생: {}", e.getMessage());
            throw new RuntimeException("PDF 생성 중 알 수 없는 오류 발생", e);
        }
    }
    }


   /* public byte[] generatePdfFromHtml(String html) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.withHtmlContent(html, null);
            builder.toStream(outputStream);
            builder.run();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("PDF 생성 중 오류 발생");
        }

        return outputStream.toByteArray();
    }*/




