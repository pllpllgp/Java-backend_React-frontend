package com.example.demoweb.login.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="members", schema = "member")
public class LoginEntity {
    @Id
    private String id;

    @Column(nullable = true)
    private String name;

    @Column(nullable = true)
    private String password;

    @Column(nullable = false)
    private String nick;

}
