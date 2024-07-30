package com.chunjae.chunjaefull5final.service;

import org.apache.batik.transcoder.Transcoder;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.apache.batik.transcoder.SVGAbstractTranscoder;
import org.apache.batik.transcoder.svg2svg.SVGTranscoder;

import com.chunjae.chunjaefull5final.domain.PaperQuestion;
import com.chunjae.chunjaefull5final.repository.TempPdfRepo;
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

    public List<StringBuilder> toSendImages(Long paperId, String type) {

        Map<Integer,StringBuilder> passages = new HashMap<>();
        List<PaperQuestion> paperQuestions = tempPdfRepo.findByPaperId(paperId);

        List<StringBuilder> list = new ArrayList<>();

        String getImageUrl = "/getImage/";

        int index = 1;
        for(PaperQuestion paperQuestion : paperQuestions){

            Integer passageId = paperQuestion.getPassageId();
            if(passageId != null && !passages.containsKey(passageId)){
                StringBuilder passageRange = new StringBuilder();
                passageRange.append("지문:"+index+" ");
                passages.put(passageId, passageRange);
                list.add(passageRange);

                String splitPassageUrl = paperQuestion.getPassageUrl().split("https://img.chunjae-platform.com/upload/capture/tsherpa/")[1];

                list.add(new StringBuilder(getImageUrl+splitPassageUrl));
            }else if(passageId != null && passages.containsKey(passageId)){
                StringBuilder passageRange = passages.get(passageId);
                int subIndex = passageRange.indexOf(" ");
                passageRange.delete(subIndex,passageRange.length());
                passageRange.append(" ~ "+index);
            }

            list.add(new StringBuilder(index + ""));
            index++;


            String splitQuestionUrl = paperQuestion.getQuestionUrl().split("https://img.chunjae-platform.com/upload/capture/tsherpa/")[1];
            list.add(new StringBuilder(getImageUrl+splitQuestionUrl));

            if("answer_only".equals(type) || "answer_explain".equals(type)){
                String splitAnswerUrl = paperQuestion.getAnswerUrl().split("https://img.chunjae-platform.com/upload/capture/tsherpa/")[1];

                list.add(new StringBuilder(getImageUrl + splitAnswerUrl));
            }
            if("answer_explain".equals(type)){
                String splitExplainUrl = paperQuestion.getExplainUrl().split("https://img.chunjae-platform.com/upload/capture/tsherpa/")[1];
                list.add(new StringBuilder(getImageUrl+splitExplainUrl));
            }
        }
        return list;
    }
}