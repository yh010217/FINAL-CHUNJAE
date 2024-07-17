package com.chunjae.chunjaefull5final.repository.User;


import com.chunjae.chunjaefull5final.domain.UserRole;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import static com.chunjae.chunjaefull5final.domain.QUser.user;

@Repository
@RequiredArgsConstructor
@Slf4j
public class UserQueryDSLImpl implements UserQueryDSL {

    private final JPAQueryFactory queryFactory;


    @Override
    public int getCount(String search, String search_txt) {

        int totalCount = 0;

        if (search == "email" || "email".equals(search)) {
            Long count = queryFactory.select(user.uid.count())
                    .from(user)
                    .where(user.email.like("%" + search_txt + "%")
                            .and(user.role.ne(UserRole.Admin)))
                    .fetchOne();
            totalCount = count.intValue();
        } else if (search == "name" || "name".equals(search)) {
            Long count = queryFactory.select(user.uid.count())
                    .from(user)
                    .where(user.name.like("%" + search_txt + "%")
                            .and(user.role.ne(UserRole.Admin)))
                    .fetchOne();
            totalCount = count.intValue();
        } else {
            Long count = queryFactory.select(user.uid.count())
                    .from(user)
                    .where(user.role.ne(UserRole.Admin))
                    .fetchOne();
            totalCount = count.intValue();
        }
        return totalCount;
    }

}