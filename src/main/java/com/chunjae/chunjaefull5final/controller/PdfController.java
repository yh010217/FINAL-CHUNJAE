package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.service.TempPdfService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
public class PdfController {
    private final TempPdfService tempPdfService;

    @GetMapping("/pdftest/{paperId}")
    public String pdfTest(@PathVariable Long paperId, Model model){
        List<Map<String,String>> list = tempPdfService.getPaperQuestionList(paperId);
        model.addAttribute("list",list);

//        tempPdfService.tempSvg(paperId);
        tempPdfService.tempSvg(paperId);

        return "pdftest/justImg";
    }


/*    @GetMapping("/pdftest/getImages/{paperId}/{type}")
    public String getImages(@PathVariable Long paperId
            , @PathVariable String type , Model model){
        List<StringBuilder> list = tempPdfService.toSendImages(paperId,type);
        model.addAttribute("list",list);
        return "pdftest/imageList";
    }

    @GetMapping("/api/pdftest/getImages/{paperId}/{type}")
    @ResponseBody
    public List<String> getImagesAPI(@PathVariable Long paperId
            , @PathVariable String type){
        List<StringBuilder> list = tempPdfService.toSendImages(paperId,type);
        List<String> strList
                = list.stream().map(item -> item.toString()).toList();
        return strList;
    }*/

}
