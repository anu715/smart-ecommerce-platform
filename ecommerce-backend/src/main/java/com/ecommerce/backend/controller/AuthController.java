package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {

        String token = authService.login(
                user.getEmail(),
                user.getPassword()
        );

        User existingUser = authService.getUserByEmail(user.getEmail());

        Map<String, String> response = new HashMap<>();

        response.put("token", token);
        response.put("role", existingUser.getRole());

        return response;
    }
}