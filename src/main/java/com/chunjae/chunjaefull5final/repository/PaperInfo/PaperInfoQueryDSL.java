package com.chunjae.chunjaefull5final.repository.PaperInfo;

import com.chunjae.chunjaefull5final.domain.PaperInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PaperInfoQueryDSL {
    Page<PaperInfo> findAllPaper(Pageable pageable);

    List<Object[]> subjectName();
}
