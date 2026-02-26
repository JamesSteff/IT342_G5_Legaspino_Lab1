package com.example.demo.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF for local development to allow React POST requests
            .csrf(csrf -> csrf.disable())
            
            // 2. Optimized CORS: Essential for session sharing between port 8080 and 3000
            .cors(cors -> cors.configurationSource(request -> {
                var cfg = new CorsConfiguration();
                cfg.setAllowedOrigins(List.of("http://localhost:3000"));
                cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                cfg.setAllowedHeaders(List.of("*"));
                cfg.setAllowCredentials(true); // REQUIRED to maintain the Google session
                return cfg;
            }))

            // 3. Session Management: Ensures the session is saved after Google login
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )
            
            // 4. Endpoint Protection
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/login/**", "/oauth2/**", "/error").permitAll()
                .anyRequest().authenticated()
            )
            
            // 5. OAuth2 Login Configuration
            .oauth2Login(oauth2 -> oauth2
                // The Fix: Redirects back to React Dashboard after successful Google login
                .defaultSuccessUrl("http://localhost:3000/dashboard", true)
            );

        return http.build();
    }
}