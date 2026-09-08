package com.appointly.controller;

import com.appointly.dto.AuthDtos.*;
import com.appointly.model.User;
import com.appointly.repository.UserRepository;
import com.appointly.security.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthController(UserRepository users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        if (users.existsByEmail(req.email().toLowerCase())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Email is already registered."));
        }
        User user = new User();
        user.setName(req.name().trim());
        user.setEmail(req.email().toLowerCase().trim());
        user.setPassword(encoder.encode(req.password()));
        users.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new AuthResponse(jwt.generate(user.getEmail(), user.getRole().name()),
                user.getId(), user.getName(), user.getEmail(), user.getRole().name()));
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {

    var userOpt = users.findByEmail(req.email().toLowerCase().trim());

    if (userOpt.isEmpty() ||
            !encoder.matches(req.password(), userOpt.get().getPassword())) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Invalid email or password."));
    }

    var u = userOpt.get();

    return ResponseEntity.ok(
            new AuthResponse(
                    jwt.generate(u.getEmail(), u.getRole().name()),
                    u.getId(),
                    u.getName(),
                    u.getEmail(),
                    u.getRole().name()
            )
    );
}

    public record ErrorResponse(String message) {}
}
