package com.github.photoscript.auth;

import com.github.photoscript.domains.users.Users;
import com.github.photoscript.domains.users.UsersService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
  @Autowired
  UsersService usersService;

  @Autowired
  private AuthService authService;

  @Autowired
  private JwtUtil jwtUtil;

  private final Logger logger = LoggerFactory.getLogger(AuthController.class);

  @PostMapping
  public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
    logger.info("Customer login request");
    UsernamePasswordAuthenticationToken authenticationToken;
    try {
      authService.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
    } catch (Exception e) {
      throw new Exception ("Incorrect username or password", e);
    }

    final Users user = usersService.getUserByEmail(authenticationRequest.getUsername());

    final String jwt = jwtUtil.generateToken(user);

    return ResponseEntity.ok(new AuthenticationResponse(jwt, user));
  }
}
