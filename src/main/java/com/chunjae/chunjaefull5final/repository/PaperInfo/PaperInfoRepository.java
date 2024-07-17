package com.chunjae.chunjaefull5final.repository.PaperInfo;

import com.chunjae.chunjaefull5final.domain.PaperInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaperInfoRepository
        extends JpaRepository<PaperInfo,Long>,PaperInfoQueryDSL {

}
