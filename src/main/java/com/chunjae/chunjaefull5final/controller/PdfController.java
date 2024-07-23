package com.chunjae.chunjaefull5final.controller;

import com.chunjae.chunjaefull5final.domain.PaperQuestion;
import com.chunjae.chunjaefull5final.service.TempPdfService;
import lombok.RequiredArgsConstructor;
import org.apache.batik.transcoder.TranscoderException;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.Base64;
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


}
