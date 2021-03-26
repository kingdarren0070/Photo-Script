package com.github.photoscript.domains.users;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {
  private final Logger logger = LoggerFactory.getLogger(UsersController.class);

  @Autowired
  private UsersService usersService;

  @GetMapping
  public ResponseEntity<List<Users>> getAllUsers() {
    logger.info("Get all users request received");
    return new ResponseEntity<>(usersService.getAll(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Users> getUserById(@PathVariable Long id) {
    logger.info("Get user by id request received");
    return new ResponseEntity<>(usersService.getById(id), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<Users> createUser(@Valid @RequestBody Users user) throws NoSuchAlgorithmException {
    logger.info("Create new user request received");
    return new ResponseEntity<>(usersService.createUser(user), HttpStatus.CREATED);
  }

  @PutMapping("/edit/{id}")
  public ResponseEntity<Users> updateUser(@PathVariable Long id, @Valid @RequestBody Users user) {
    logger.info("Edit user request received");
    return new ResponseEntity<>(usersService.updateUser(id, user), HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Users> deleteUser(@PathVariable Long id) {
    logger.info("Delete user request received");
    usersService.deleteUser(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
