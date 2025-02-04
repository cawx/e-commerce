package com.example.ecommerce.controller;

import com.example.ecommerce.DTO.AuthDTO;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthDTO authDTO) {
        return userService.login(authDTO);
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) throws Exception {
        return userService.register(user);
    }
}