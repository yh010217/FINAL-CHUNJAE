package com.chunjae.chunjaefull5final.repository.QuestionError;

import com.chunjae.chunjaefull5final.domain.QuestionError;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import static com.chunjae.chunjaefull5final.domain.QQuestionError.questionError;
import static com.chunjae.chunjaefull5final.domain.QUser.user;

import java.util.List;

@RequiredArgsConstructor
public class QuestionErrorQueryDSLImpl implements QuestionErrorQueryDSL{

    private final JPAQueryFactory queryFactory;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<QuestionError> findAllError(Pageable pageable) {
        BooleanExpression condition = questionError.status.eq("no");

        List<QuestionError> fetch = queryFactory.select(questionError)
                .from(questionError)
                .join(questionError.user, user)
                .fetchJoin()
                .where(condition)
                .orderBy(questionError.errorId.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        Long totalCount=queryFactory.select(questionError.count())
                .from(questionError)
                .fetchOne();
        return new PageImpl<>(fetch, pageable, totalCount);
    }
}
