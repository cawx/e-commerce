package com.example.ecommerce.controller;

import com.example.ecommerce.DTO.AuthDTO;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public String login(@RequestBody AuthDTO authDTO) throws Exception {
        return userService.login(authDTO);
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) throws Exception {
        return userService.register(user);
    }
}