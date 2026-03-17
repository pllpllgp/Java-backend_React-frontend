package com.example.demoweb.login.repository;

import com.example.demoweb.login.entity.LoginEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginRepository  extends JpaRepository<LoginEntity, String> {
    Optional<LoginEntity> findByIdAndPassword(String id, String password);

}
