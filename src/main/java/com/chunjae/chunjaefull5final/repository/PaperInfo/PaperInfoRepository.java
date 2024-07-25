package com.chunjae.chunjaefull5final.repository.PaperInfo;

import com.chunjae.chunjaefull5final.domain.PaperInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaperInfoRepository
        extends JpaRepository<PaperInfo,Long>,PaperInfoQueryDSL {

    @Query( " select p from PaperInfo p where p.paperId=:paperId" )
    PaperInfo findPaperDetail(Long paperId);

    @Query("SELECT p FROM PaperInfo p WHERE p.user.uid = :uid")
    List<PaperInfo> getList(@Param("uid") Long uid);

}
