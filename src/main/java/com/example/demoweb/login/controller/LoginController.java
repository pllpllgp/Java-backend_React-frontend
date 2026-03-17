package com.example.demoweb.login.controller;

import com.example.demoweb.config.JwtUtil;
import com.example.demoweb.login.dto.LoginDTO;
import com.example.demoweb.login.entity.LoginEntity;
import com.example.demoweb.login.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody LoginDTO loginDto) {
        boolean result = loginService.signUp(loginDto);

        Map<String, Object> response = new HashMap<>();

        response.put("result", result);
        return response;

    }

    @PostMapping("/login")
    public LoginDTO login(@RequestBody LoginDTO loginDto) {
        LoginEntity loginInfo = loginService.loginCheck(loginDto.getId(), loginDto.getPassword());

        LoginDTO dto = new LoginDTO();

        if(StringUtils.hasText(loginInfo.getId())) {
            dto.setId(loginInfo.getId());
            dto.setName(loginInfo.getName());
            dto.setNick(loginInfo.getNick());
            dto.setToken(jwtUtil.generateToken(loginInfo.getId()));

        }

        return dto;
    }
}
