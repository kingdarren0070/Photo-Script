package com.github.photoscript.auth;

import com.github.photoscript.domains.users.Users;
import com.github.photoscript.domains.users.UsersRepository;
import com.github.photoscript.encryption.Hash;
import java.security.NoSuchAlgorithmException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements AuthenticationProvider {
  @Autowired
  private UsersRepository usersRepository;

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    UsernamePasswordAuthenticationToken authenticationToken = null;
    String username = authentication.getName();
    String password = authentication.getCredentials().toString();

    Users foundUser = usersRepository.findByEmail(username);
    if(foundUser == null) {
      throw new UsernameNotFoundException("Email " + username + " not found.");
    } else {
      password += foundUser.getSalt();
      try {
        password = Hash.getHex(password);
      } catch (NoSuchAlgorithmException e) {
        e.printStackTrace();
      }
      String email = foundUser.getEmail();
      String pass = foundUser.getPassword();
      if(password.equals(pass) && username.equals(email)) {
        authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
      } else {
        throw new BadCredentialsException("Email and Passwords do not match");
      }
    }

    return authenticationToken;
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return authentication.equals(UsernamePasswordAuthenticationToken.class);
  }
}
