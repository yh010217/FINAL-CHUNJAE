package com.chunjae.chunjaefull5final.repository.PaperInfo;


import com.chunjae.chunjaefull5final.domain.PaperInfo;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public List<Object[]> subjectName() {
        List<Tuple> fetch = queryFactory.select(subject.subjectId, subject.subjectName)
                .from(subject)
                .fetch();

        return fetch.stream()
                .map(tuple -> new Object[]{tuple.get(subject.subjectId), tuple.get(subject.subjectName)})
                .collect(Collectors.toList());
    }


}
