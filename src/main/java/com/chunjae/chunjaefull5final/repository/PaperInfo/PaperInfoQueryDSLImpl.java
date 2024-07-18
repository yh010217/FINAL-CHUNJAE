package com.chunjae.chunjaefull5final.repository.PaperInfo;


import com.chunjae.chunjaefull5final.domain.PaperInfo;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static com.chunjae.chunjaefull5final.domain.QPaperInfo.paperInfo;
import static com.chunjae.chunjaefull5final.domain.QSubject.subject;
import static com.chunjae.chunjaefull5final.domain.QUser.user;

@RequiredArgsConstructor
public class PaperInfoQueryDSLImpl implements PaperInfoQueryDSL{

    private final JPAQueryFactory queryFactory;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<PaperInfo> findAllPaper(Pageable pageable) {

        List<PaperInfo> fetch = queryFactory.select(paperInfo)
                .from(paperInfo)
                .join(paperInfo.user, user)
                .fetchJoin()
                .join(paperInfo.subject, subject)
                .fetchJoin()
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long totalCount = queryFactory.select(paperInfo.count())
                .from(paperInfo)
                .fetchOne();

        return new PageImpl<>(fetch, pageable, totalCount);

    }


}
