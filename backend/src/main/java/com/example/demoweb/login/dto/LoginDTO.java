package com.example.demoweb.login.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {
    private String id;
    private String name;
    private String password;
    private String nick;
    private String token;
}
