package com.chunjae.chunjaefull5final.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.batik.transcoder.TranscoderException;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
public class SvgToPngController {

    String uploadPath = "D:\\FINAL-CHUNJAE\\src\\main\\resources\\static\\images\\svgToPng";

    @PostMapping("/convertImage")
    public ResponseEntity<List<String>> convertAndSave(@RequestBody List<String> dataList) {
        List<String> resultList = new ArrayList<>();

        log.info("===================!!!!!!!!!!!!!!전달 성공 convertAndSave!!!!!!!!!!!!=====================");
        for (String item : dataList) {
            try {
                if (isSvgUrl(item)) {
                    String pngPath = convertSvgToPngAndSaveLocally(item); // SVG를 PNG로 변환하고 저장
                    resultList.add(pngPath);
                } else {
                    resultList.add(item); // SVG URL이 아닌 경우 그대로 추가
                }
            } catch (Exception e) {
                // 오류 처리
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return ResponseEntity.ok(resultList); // 결과 리스트 반환
    }

    private boolean isSvgUrl(String url) {
        // 간단한 SVG URL 체크 로직 예시
        log.info("===================!!!!!!!!!!!!!!전달 성공 isSvgUrl!!!!!!!!!!!!=====================");
        return url.toLowerCase().endsWith(".svg");
    }

    private String convertSvgToPngAndSaveLocally(String svgUrl) throws IOException, TranscoderException {
/*        String svgData = fetchSvgFromUrl(svgUrl); // SVG 데이터 가져오기
        byte[] pngData = convertSvgToPng(svgData); // SVG를 PNG로 변환*/

//        // PNG 파일을 로컬에 저장
//        String fileName = "image_" + System.currentTimeMillis() + ".png"; // 고유한 파일명 생성
//        String filePath = uploadPath + File.separator + fileName;
//        savePngLocally(pngData, filePath);

        String svgName
                = svgUrl.substring(svgUrl.lastIndexOf("/",svgUrl.lastIndexOf("/")-1)+1
                ,svgUrl.lastIndexOf("/"));
        String pngFilePath = "D:\\FINAL-CHUNJAE\\src\\main\\resources\\static\\images\\svgToPng\\"+svgName+".png";
        InputStream svgInputStream = new URL(svgUrl).openStream();
        String tempSvgFilePath = "D:\\FINAL-CHUNJAE\\src\\main\\resources\\static\\images\\svgToPng\\"+svgName+".svg";
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

        int index = pngFilePath.lastIndexOf("\\");
        String pngFilePathSub = pngFilePath.substring(index+1);
        log.info("================={}=================", pngFilePathSub);
        return pngFilePathSub; // PNG 파일 경로 반환
    }

    private String fetchSvgFromUrl(String urlString) throws IOException {
        URL url = new URL(urlString);
        URLConnection connection = url.openConnection();

        StringWriter svgContent = new StringWriter();
        try (Reader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
            int c;
            while ((c = reader.read()) != -1) {
                svgContent.write(c);
            }
        }

        return svgContent.toString();
    }

    private byte[] convertSvgToPng(String svgData) throws IOException, TranscoderException {
        PNGTranscoder transcoder = new PNGTranscoder();
        TranscoderInput input = new TranscoderInput(new StringReader(svgData));
        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        TranscoderOutput output = new TranscoderOutput(pngOutputStream);

        try {
            transcoder.transcode(input, output);
            return pngOutputStream.toByteArray();
        } finally {
            pngOutputStream.close();
        }
    }

    private void savePngLocally(byte[] pngData, String filePath) throws IOException {
        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            fos.write(pngData);
        }
    }
}
