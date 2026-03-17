package com.example.demoweb.login.service;

import com.example.demoweb.login.entity.LoginEntity;
import com.example.demoweb.login.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private LoginRepository loginRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        LoginEntity user = loginRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("사용자 없음: " + id));

        return User.builder()                                                                                                                                                                   .username(user.getId())
                .password(user.getPassword())
                .roles("USER")
                .build();
    }
}
