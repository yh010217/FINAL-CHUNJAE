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
import java.util.List;

@RestController
@Slf4j
public class SvgToPngController {

    String uploadPath = "D:\\FINAL-CHUNJAE\\src\\main\\resources\\static\\images\\svgToPng";

    @PostMapping("/convertImage")
    public ResponseEntity<List<ImageDTO>> convertAndSave(@RequestBody List<String> dataList) {
        List<ImageDTO> resultList = new ArrayList<>();

        log.info("===================!!!!!!!!!!!!!!전달 성공 convertAndSave!!!!!!!!!!!!=====================");
        for (String item : dataList) {
            try {
                if (isSvgUrl(item)) {
                    int[] widthHeight = getRatioSvg(item);
                    resultList.add(new ImageDTO(item, widthHeight[0], widthHeight[1]));
                } else {
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

        System.out.println(item);
        if(item.contains("/getImage/")){

            String getContent = item.split("/getImage/")[1];

            String baseUrl = "https://img.chunjae-platform.com/upload/capture/tsherpa/"+getContent;

            System.out.println(baseUrl);

            try (InputStream svgInputStream = new URL(baseUrl).openStream();) {


                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = svgInputStream.read(buffer)) != -1) {
                    byteArrayOutputStream.write(buffer, 0, bytesRead);
                }

                // 바이트 배열 생성
                byte[] imageBytes = byteArrayOutputStream.toByteArray();


                try {
                    InputStream svgInputStream2 = new ByteArrayInputStream(imageBytes);

                    // XML 파서 설정
                    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                    DocumentBuilder builder = factory.newDocumentBuilder();
                    Document document = builder.parse(svgInputStream2);

                    // SVG 루트 엘리먼트 가져오기
                    Element svgElement = document.getDocumentElement();

                    // width와 height 속성 읽기
                    String width = svgElement.getAttribute("width");
                    String height = svgElement.getAttribute("height");

                    // 출력
                    System.out.println("SVG Width: " + width);
                    System.out.println("SVG Height: " + height);

                    // 비율 계산
                    if (!width.isEmpty() && !height.isEmpty()) {
                        intArr[0] = 310;
                        intArr[1] = (int)Math.ceil(((Integer.parseInt(height)*1.0 / Integer.parseInt(width)) * 310));

                        double widthValue = Double.parseDouble(width);
                        double heightValue = Double.parseDouble(height);
                        double ratio = widthValue / heightValue;
                        System.out.println("Aspect Ratio: " + ratio);
                    } else {
                        System.out.println("Width or Height attribute is missing.");
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                }

            } catch (MalformedURLException me) {
                System.out.println("url이 이상한듯?");
                System.out.println(me);
            } catch (IOException ie) {
                System.out.println("stream 처리가 이상한듯?");
                System.out.println(ie);
            }


        }

        return intArr;
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
                = svgUrl.substring(svgUrl.lastIndexOf("/", svgUrl.lastIndexOf("/") - 1) + 1
                , svgUrl.lastIndexOf("/"));
        String pngFilePath = "D:\\FINAL-CHUNJAE\\src\\main\\resources\\static\\images\\svgToPng\\" + svgName + ".png";

        InputStream svgInputStream = new URL(svgUrl).openStream();

        String tempSvgFilePath = "D:\\FINAL-CHUNJAE\\src\\main\\resources\\static\\images\\svgToPng\\" + svgName + ".svg";

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
        String pngFilePathSub = pngFilePath.substring(index + 1);
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