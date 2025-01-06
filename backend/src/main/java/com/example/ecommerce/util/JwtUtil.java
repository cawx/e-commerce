package com.example.ecommerce.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    Key key = Jwts.SIG.HS256.key().build();

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(key)
                .compact();
    }

    public Boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith((SecretKey) key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}
