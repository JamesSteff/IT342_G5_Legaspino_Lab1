package edu.cit.legaspino.quickcontacts.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import edu.cit.legaspino.quickcontacts.model.User;
import edu.cit.legaspino.quickcontacts.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") 
public class AuthController {

    @Autowired 
    private UserRepository userRepository;
    
    @Autowired 
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // I-check una kon naa na ba ang email para dili mag-error ang database
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is already taken!"));
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User Registered Successfully!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginReq) {
        Optional<User> user = userRepository.findByEmail(loginReq.getEmail());
        
        if (user.isPresent() && passwordEncoder.matches(loginReq.getPassword(), user.get().getPassword())) {
            // Sa tinuod nga Capstone, kani dapit nimo i-generate ang real JWT token
            return ResponseEntity.ok(Map.of(
                "message", "Login Success", 
                "token", "mock-jwt-token",
                "userId", user.get().getId(),
                "username", user.get().getUsername()
            ));
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid Credentials"));
    }
}