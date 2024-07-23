package com.chunjae.chunjaefull5final.repository.User;

import com.chunjae.chunjaefull5final.domain.User;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User,Long>,UserQueryDSL {
     @Query(" select  u from  User u where u.email=:email order by u.uid desc ")
      User findByEmail(String email);

    @Override
    <S extends User> S save(S entity);

    @Override
    Optional<User> findById (Long aLong);
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
    @Query( "select u from User u where u.uid=:uid ")
    User findUserDetail(Long uid);
    @Transactional
    @Modifying
    @Query(" update User u "
            + " set u.pwd='' ,u.role='Stop'"
            + " where u.uid=:uid ")
    void deleteUser(Long uid);
    @Query(" select  u from  User u where u.email=:email")
    User findByCheckEmail(String email);



}
