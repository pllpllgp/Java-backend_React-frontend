package com.example.demoweb.login.controller;

import com.example.demoweb.login.dto.LoginDTO;
import com.example.demoweb.login.entity.LoginEntity;
import com.example.demoweb.login.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody LoginDTO loginDto) {
        System.out.println("id:::::::::::::::::::" + loginDto.getId());
        System.out.println("name:::::::::::::::::::" + loginDto.getName());
        System.out.println("password:::::::::::::::::::" + loginDto.getPassword());
        System.out.println("nick:::::::::::::::::::" + loginDto.getNick());

        boolean result = loginService.signUp(loginDto);

        Map<String, Object> response = new HashMap<>();

        response.put("result", result);
        return response;

    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginDTO loginDto) {
        LoginEntity loginInfo = loginService.loginCheck(loginDto.getId(), loginDto.getPassword());

        Map<String, Object> response = new HashMap<>();

        if(loginInfo.getId() != null) {
            response.put("success", true);
            response.put("userDto", loginDto);
            response.put("message", "로그인 성공");

        } else {
            response.put("success", false);
            response.put("userDto", loginDto);
            response.put("message", "로그인 실패");

        }

        return response;
    }
}
