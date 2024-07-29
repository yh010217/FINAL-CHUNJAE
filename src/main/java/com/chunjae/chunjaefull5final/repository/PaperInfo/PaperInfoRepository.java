package com.chunjae.chunjaefull5final.repository.PaperInfo;

import com.chunjae.chunjaefull5final.domain.PaperInfo;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
  
    @Transactional
    @Modifying
    @Query("UPDATE PaperInfo p SET p.delete_yn = 'Y', p.saveQuestionPath = NULL WHERE p.paperId = :paperId")
    void updateQuestionPathToNull(@Param("paperId") Long paperId);

    @Transactional
    @Modifying
    @Query("UPDATE PaperInfo p SET p.delete_yn = 'Y', p.saveAnswerPath = NULL WHERE p.paperId = :paperId")
    void updateSaveAnswerPathToNull(@Param("paperId") Long paperId);

    @Transactional
    @Modifying
    @Query("UPDATE PaperInfo p SET p.delete_yn = 'Y', p.saveAllPath = NULL WHERE p.paperId = :paperId")
    void updateAllPathToNull(@Param("paperId") Long paperId);

    @Modifying
    @Transactional
    @Query("update PaperInfo p set p.delete_yn = 'Y' where p.user.uid = :uid")
    void updatePaperInfoDeleteYn(@Param("uid") Long uid);


}







