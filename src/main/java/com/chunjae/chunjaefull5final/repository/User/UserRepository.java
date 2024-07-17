package com.chunjae.chunjaefull5final.repository.User;

import com.chunjae.chunjaefull5final.domain.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User,Long>,UserQueryDSL {
    @Query(" select  u from  User u where u.email=:email ")
    User findByEmail(String email);

    @Override
    <S extends User> S save(S entity);

    @Override
    Optional<User> findById (Long integer);
    @Query( " select  u from  User  u where u.name=:name ")
    User findByUsername(String name);

    @Query(" select u from User u where u.snsId=:snsId")
    Optional<User> findBySnsId(@Param("snsId") String snsId);

    @Query(" select u " +
            " from User u " +
            " where u.email like concat('%', :search_txt, '%')  and u.role<>'Admin' ")
    List<User> finUsersEmail(Pageable pageable, String search_txt);
    @Query(" select u " +
            " from User u " +
            " where u.name like concat('%', :search_txt, '%')  and u.role<>'Admin' ")
    List<User> finUserName(Pageable pageable, String search_txt);
}