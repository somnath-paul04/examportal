package com.exam.config;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException; // Added for error handling
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtUtils {

    // IMPORTANT: Use a strong, secure, and Base64-encoded key in a real application.
    // This value must be at least 32 characters long for HS256 to be secure.
    private final String SECRET_KEY = "ThisIsAVeryLongAndSecureKeyForMyJWTExamPortalProject32CharactersMin";
    
    // Token validity time (10 hours in milliseconds)
    public static final long JWT_TOKEN_VALIDITY = 1000 * 60 * 60 * 10; 

    // Helper method to get the signing key
    private Key getSignKey() {
        // Converts the Base64-encoded secret string into a proper Key object
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        // Check for null to handle failed parsing gracefully (token expired/invalid)
        if (claims == null) {
            return null;
        }
        return claimsResolver.apply(claims);
    }
    
    // --- UPDATED METHOD with Error Handling ---
    private Claims extractAllClaims(String token) {
        try {
            // Modern JWT Parser Builder style
            return Jwts.parserBuilder()
                       .setSigningKey(getSignKey())
                       .build()
                       .parseClaimsJws(token)
                       .getBody();
        } catch (JwtException e) {
            // If the token is invalid, expired, or malformed, a JwtException is thrown.
            // Returning null allows calling methods to handle the failure.
            System.err.println("JWT Parsing Error: " + e.getMessage());
            return null; 
        }
    }

    private Boolean isTokenExpired(String token) {
        // It's safer to check for null here as well, in case parsing failed earlier.
        Date expiration = extractExpiration(token);
        return expiration != null && expiration.before(new Date());
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // Add any custom claims here if needed: claims.put("role", userDetails.getAuthorities());
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {

        // Modern JWT Builder style
        return Jwts.builder()
                   .setClaims(claims)
                   .setSubject(subject)
                   .setIssuedAt(new Date(System.currentTimeMillis()))
                   .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                   .signWith(getSignKey(), SignatureAlgorithm.HS256)
                   .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        // Check if username is extracted (i.e., parsing succeeded) and token is not expired
        return (username != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}