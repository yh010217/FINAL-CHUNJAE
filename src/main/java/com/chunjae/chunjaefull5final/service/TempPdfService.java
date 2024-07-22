package com.chunjae.chunjaefull5final.service;

import org.apache.batik.transcoder.Transcoder;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.apache.batik.transcoder.SVGAbstractTranscoder;
import org.apache.batik.transcoder.svg2svg.SVGTranscoder;

import com.chunjae.chunjaefull5final.domain.PaperQuestion;
import com.chunjae.chunjaefull5final.repository.TempPdfRepo;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Table;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URL;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TempPdfService {

    private final TempPdfRepo tempPdfRepo;

    public List<Map<String, String>> getPaperQuestionList(Long paperId) {
        List<Map<String, String>> result = new ArrayList<>();

        List<PaperQuestion> paperQuestions = tempPdfRepo.findByPaperId(paperId);

        for (PaperQuestion paperQuestion : paperQuestions) {

            Map<String, String> map = new HashMap<>();
            if (paperQuestion.getPassageUrl() != null) {
                map.put("passage", paperQuestion.getPassageUrl());
            }else{
                map.put("passage", null);
            }
            if(paperQuestion.getQuestionUrl() != null){
                map.put("question", paperQuestion.getQuestionUrl());
            }else{
                map.put("question", null);
            }
            if(paperQuestion.getAnswerUrl() != null){
                map.put("answer", paperQuestion.getAnswerUrl());
            }else{
                map.put("answer", null);
            }
            if(paperQuestion.getExplainUrl() != null){
                map.put("explain", paperQuestion.getExplainUrl());
            }else{
                map.put("explain", null);
            }
            result.add(map);
        }

        return result;
    }
    public void tempSvg(Long paperId) {
        List<String> svgUrls = new ArrayList<>();
        List<PaperQuestion> paperQuestions = tempPdfRepo.findByPaperId(paperId);

        for (PaperQuestion paperQuestion : paperQuestions) {

            if (paperQuestion.getPassageUrl() != null && !paperQuestion.getPassageUrl().equals("null")) {
                svgUrls.add(paperQuestion.getPassageUrl());
            }
            if(paperQuestion.getQuestionUrl() != null && !paperQuestion.getQuestionUrl().equals("null")){
                svgUrls.add(paperQuestion.getQuestionUrl());
            }
            if(paperQuestion.getAnswerUrl() != null && !paperQuestion.getAnswerUrl().equals("null")){
                svgUrls.add(paperQuestion.getAnswerUrl());
            }
            if(paperQuestion.getExplainUrl() != null && !paperQuestion.getExplainUrl().equals("null")){
                svgUrls.add(paperQuestion.getExplainUrl());
            }
        }

        int i = 1;
        try {
            for (String svgUrl : svgUrls) {
                String pngFilePath = "C:\\Users\\user\\Downloads\\svgToPng\\output_"+i+".png";
                i++;
                // URL로부터 InputStream 생성
                InputStream svgInputStream = new URL(svgUrl).openStream();

                // 임시 파일로 SVG 저장
                String tempSvgFilePath = "C:\\Users\\user\\Downloads\\svgToPng\\temp.svg";
                try (OutputStream tempSvgOutputStream = new FileOutputStream(tempSvgFilePath)) {
                    IOUtils.copy(svgInputStream, tempSvgOutputStream);
                }

                // SVG 파일을 PNG 파일로 변환
                try (InputStream svgFileStream = new FileInputStream(tempSvgFilePath);
                     OutputStream pngFileStream = new FileOutputStream(pngFilePath)) {

                    TranscoderInput inputSvgImage = new TranscoderInput(svgFileStream);
                    TranscoderOutput outputPngImage = new TranscoderOutput(pngFileStream);

                    PNGTranscoder transcoder = new PNGTranscoder();
                    transcoder.transcode(inputSvgImage, outputPngImage);
                }

                System.out.println("SVG 파일이 PNG로 변환되었습니다: " + pngFilePath);
            }
        }catch (Exception e){
            System.out.println(e);
        }


    }


    public void tempMakePdf(Long paperId) {
        try {
            // PDF 작성자 초기화
            String dest = "C:\\Users\\user\\Downloads\\svgToPng\\output.pdf";
            PdfWriter writer = new PdfWriter(dest);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc, PageSize.A4);
            document.setMargins(20, 20, 20, 20); // 위, 오른쪽, 아래, 왼쪽 마진

            // 테이블 생성: 2열
            Table table = new Table(2);

            List<String> svgUrls = new ArrayList<>();
            List<PaperQuestion> paperQuestions = tempPdfRepo.findByPaperId(paperId);

            for (PaperQuestion paperQuestion : paperQuestions) {

                if (paperQuestion.getPassageUrl() != null && !paperQuestion.getPassageUrl().equals("null")) {
                    svgUrls.add(paperQuestion.getPassageUrl());
                }
                if(paperQuestion.getQuestionUrl() != null && !paperQuestion.getQuestionUrl().equals("null")){
                    svgUrls.add(paperQuestion.getQuestionUrl());
                }
                if(paperQuestion.getAnswerUrl() != null && !paperQuestion.getAnswerUrl().equals("null")){
                    svgUrls.add(paperQuestion.getAnswerUrl());
                }
                if(paperQuestion.getExplainUrl() != null && !paperQuestion.getExplainUrl().equals("null")){
                    svgUrls.add(paperQuestion.getExplainUrl());
                }
            }/*
            // 이미지 데이터
            String[] imageUrls = {
                    "https://example.com/image1.jpg",
                    "https://example.com/image2.jpg",
                    "https://example.com/image3.jpg",
                    "https://example.com/image4.jpg",
                    "https://example.com/image5.jpg",
                    "https://example.com/image6.jpg"
            };
*/
            // 셀 크기 설정
            float cellWidth = 100f;
            float cellHeight = 100f;

            // 이미지 삽입
            for (String imageUrl : svgUrls) {
                ImageData imageData = ImageDataFactory.create(imageUrl);
                Image img = new Image(imageData).scaleToFit(cellWidth, cellHeight);
                float width = img.getImageScaledWidth();
                float height = img.getImageScaledHeight();

                // 이미지의 비율이 맞지 않으면 조정 (100 x 100 크기에 맞추기)
                if (width > cellWidth || height > cellHeight) {
                    img = new Image(imageData).scaleAbsolute(cellWidth, cellHeight);
                }

                Cell cell = new Cell().add(img).setWidth(cellWidth).setHeight(cellHeight).setBorder(null).setPadding(5);
                table.addCell(cell);
            }

            // 테이블을 문서에 추가
            document.add(table);

            // 문서 닫기
            document.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<StringBuilder> toSendImages(Long paperId, String type) {

        Map<Integer,StringBuilder> passages = new HashMap<>();
        List<PaperQuestion> paperQuestions = tempPdfRepo.findByPaperId(paperId);

        List<StringBuilder> list = new ArrayList<>();
        int index = 1;
        for(PaperQuestion paperQuestion : paperQuestions){

            Integer passageId = paperQuestion.getPassageId();
            if(passageId != null && !passages.containsKey(passageId)){
                StringBuilder passageRange = new StringBuilder();
                passageRange.append(index+" ~ ");
                passages.put(passageId, passageRange);
                list.add(passageRange);
                list.add(new StringBuilder(paperQuestion.getPassageUrl()));
            }else if(passageId != null && passages.containsKey(passageId)){
                StringBuilder passageRange = passages.get(passageId);
                int subIndex = passageRange.indexOf("~");
                passageRange.delete(subIndex,passageRange.length());
                passageRange.append("~ "+index);
            }

            list.add(new StringBuilder(index + ""));
            index++;

            list.add(new StringBuilder(paperQuestion.getQuestionUrl()));
            if("answer_only".equals(type) || "answer_explain".equals(type)){
                list.add(new StringBuilder(paperQuestion.getAnswerUrl()));
            }
            if("answer_explain".equals(type)){
                list.add(new StringBuilder(paperQuestion.getExplainUrl()));
            }
        }
        return list;
    }
}