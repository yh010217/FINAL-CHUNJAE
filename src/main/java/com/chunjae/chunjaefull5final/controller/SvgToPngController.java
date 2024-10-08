package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.dto.ImageDTO;
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
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@Slf4j
public class SvgToPngController {

    @PostMapping("/convertImage")
    public ResponseEntity<List<ImageDTO>> convertAndSave(@RequestBody List<String> dataList) {
        List<ImageDTO> resultList = new ArrayList<>();

//        log.info("===================!!!!!!!!!!!!!!전달 성공 convertAndSave!!!!!!!!!!!!=====================");
        for (String item : dataList) {
            try {
                if (item !=null && isSvgUrl(item)) {
                    log.info("--------------------- svg 입니다 --------------------- {}", item);
                    String svgData = readSvgDataFromUrl(item);
                    String base64Svg = "data:image/svg+xml;base64," + Base64.getEncoder().encodeToString(svgData.getBytes());
                    int[] widthHeight = getRatioSvg(item);
                    resultList.add(new ImageDTO(base64Svg, widthHeight[0], widthHeight[1]));
                } else {
                    log.info(" --------------------- svg가 아닙니다 ---------------------");
                    resultList.add(new ImageDTO(item, 310, 21)); // SVG URL이 아닌 경우 그대로 추가
                }
            } catch (Exception e) {
                // 오류 처리
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return ResponseEntity.ok(resultList); // 결과 리스트 반환
    }

    private int[] getRatioSvg(String item) {
        int[] intArr = new int[2];

        // 재시도 설정
        int maxRetries = 5;
        int retryDelay = 1000; // 1초 대기

        System.out.println(item);
        String getContent = item.split("/tsherpa/")[1];

        String baseUrl = item;

        System.out.println(baseUrl);

        boolean success = false;

        for (int attempt = 0; attempt < maxRetries; attempt++) {
            try (InputStream svgInputStream = new URL(baseUrl).openStream();
                 ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {

                // URL에서 SVG 데이터 읽기
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = svgInputStream.read(buffer)) != -1) {
                    byteArrayOutputStream.write(buffer, 0, bytesRead);
                }

                // 바이트 배열 생성
                byte[] imageBytes = byteArrayOutputStream.toByteArray();

                // SVG 데이터 파싱
                try (InputStream svgInputStream2 = new ByteArrayInputStream(imageBytes)) {
                    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                    DocumentBuilder builder = factory.newDocumentBuilder();
                    Document document = builder.parse(svgInputStream2);

                    // SVG 루트 엘리먼트 가져오기
                    Element svgElement = document.getDocumentElement();

                    // width와 height 속성 읽기
                    String width = svgElement.getAttribute("width");
                    String height = svgElement.getAttribute("height");

                    log.info("========높이!!==={}", height);

                    // 출력
//                        System.out.println("SVG Width: " + width);
//                        System.out.println("SVG Height: " + height);

                    // 비율 계산
                    if (!width.isEmpty() && !height.isEmpty()) {
                        intArr[0] = 310;
                        intArr[1] = (int) Math.ceil(((Integer.parseInt(height) * 1.0 / Integer.parseInt(width)) * 310));

                        double widthValue = Double.parseDouble(width);
                        double heightValue = Double.parseDouble(height);
                        double ratio = widthValue / heightValue;
//                            System.out.println("Aspect Ratio: " + ratio);
                        success = true;
                        break; // 성공적으로 요청이 완료되면 루프 종료
                    } else {
                        System.out.println("Width or Height attribute is missing.");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }

            } catch (MalformedURLException me) {
                System.out.println("URL이 이상한듯?");
                System.out.println(me);
                break; // URL이 잘못된 경우 재시도하지 않음
            } catch (IOException ie) {
                System.out.println("Stream 처리 문제가 발생했음.");
                System.out.println(ie);
                // 일시적으로 대기 후 재시도
                try {
                    Thread.sleep(retryDelay);
                } catch (InterruptedException ie2) {
                    Thread.currentThread().interrupt();
                }
            }
        }

        if (!success) {
            System.out.println("Failed to retrieve SVG after " + maxRetries + " attempts.");
        }

        return intArr;
    }


    private boolean isSvgUrl(String url) {
        // log.info("===================!!!!!!!!!!!!!!전달 성공 isSvgUrl!!!!!!!!!!!!=====================");
        if (url == null || !url.toLowerCase().endsWith(".svg")) {
            return false;
        }
        log.info(url + " >>>>>>>>>>>>>>>>>>>>>>> url 값 확인하기 ");
        return url.toLowerCase().endsWith(".svg");
    }

    private String readSvgDataFromUrl(String url) throws IOException {
        try (InputStream svgInputStream = new URL(url).openStream();
             ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {

            // URL에서 SVG 데이터 읽기
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = svgInputStream.read(buffer)) != -1) {
                byteArrayOutputStream.write(buffer, 0, bytesRead);
            }
            return byteArrayOutputStream.toString();
        }
    }

}