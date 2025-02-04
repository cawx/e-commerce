package com.example.ecommerce.services;

import com.example.ecommerce.DTO.AuthDTO;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.util.JwtUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, UserDetailsService userDetailsService, CustomUserDetailsService customUserDetailsService, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.customUserDetailsService = customUserDetailsService;
        this.jwtUtil = jwtUtil;
    }

    public User register(User user) throws Exception {
        try {
            String hash = passwordEncoder.encode(user.getPassword());
            user.setPassword(hash);
            return userRepository.save(user);
        } catch (Exception e) {
            throw new Exception("something went wrong.");
        }
    }

    public ResponseEntity<?> login(AuthDTO authDTO) throws BadCredentialsException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authDTO.getUsername(), authDTO.getPassword())
            );
            final UserDetails userDetails = customUserDetailsService.loadUserByUsername(authDTO.getUsername());
            String role = userDetails.getAuthorities()
                    .stream()
                    .findFirst()
                    .map(GrantedAuthority::getAuthority)
                    .orElse("USER");
            String token = jwtUtil.generateToken(userDetails.getUsername(), role);
            ResponseCookie cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .secure(false)
                    .sameSite("None")
                    .path("/")
                    .build();
            ResponseEntity<?> response = ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body("login success");
            System.out.println("Response headers: " + response.getHeaders());
            return response;
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("invalid username or password. " + e);
        }
    }

}
