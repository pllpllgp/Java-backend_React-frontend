package com.example.demoweb.login.service;

import com.example.demoweb.login.dto.LoginDTO;
import com.example.demoweb.login.entity.LoginEntity;
import com.example.demoweb.login.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public boolean signUp(LoginDTO dto) {
        if(loginRepository.findById(dto.getId()).isPresent()) {
            return false;
        };

        LoginEntity entity = new LoginEntity();
        entity.setId(dto.getId());
        entity.setPassword(passwordEncoder.encode(dto.getPassword()));
        entity.setName(dto.getName());
        entity.setNick(dto.getNick());

        loginRepository.save(entity);

        return true;

    }

    public LoginEntity loginCheck(String id, String password) {
        Optional<LoginEntity> userOpt = loginRepository.findById(id);

        if(userOpt.isPresent()) {
            LoginEntity user = userOpt.get();
            if(passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }

        return new LoginEntity();

    }
}
