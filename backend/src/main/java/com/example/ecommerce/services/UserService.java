package com.example.ecommerce.services;

import com.example.ecommerce.DTO.AuthDTO;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    public User register(User user) throws Exception {
        try {
            String hash = passwordEncoder.encode(user.getPassword());
            user.setPassword(hash);
            return userRepository.save(user);
        } catch (Exception e) {
            throw new Exception("something went wrong.");
        }
    }

    public String login(AuthDTO authDTO) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authDTO.getUsername(), authDTO.getPassword())
            );
        } catch (Exception e) {
            throw new Exception("invalid username or password.");
        }
        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(authDTO.getUsername());
        return jwtUtil.generateToken(userDetails.getUsername());
    }
}
