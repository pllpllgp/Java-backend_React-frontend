package com.example.demoweb.login.service;

import com.example.demoweb.login.dto.LoginDTO;
import com.example.demoweb.login.entity.LoginEntity;
import com.example.demoweb.login.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    public boolean signUp(LoginDTO dto) {
        if(loginRepository.findByIdAndPassword(dto.getId(), dto.getPassword()).isPresent()) {
            return false;
        };

        LoginEntity entity = new LoginEntity();
        entity.setId(dto.getId());
        entity.setPassword(dto.getPassword());
        entity.setName(dto.getName());
        entity.setNick(dto.getNick());

        loginRepository.save(entity);

        return true;

    }

    public LoginEntity loginCheck(String id, String password) {
        Optional<LoginEntity> userOpt = loginRepository.findById(id);

        LoginEntity user = new LoginEntity();
        if(userOpt.isPresent()) {
            user = userOpt.get();
            return user;

        }

        return user;

    }
}
