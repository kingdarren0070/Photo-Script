package com.github.photoscript.domains.users;

import com.github.photoscript.encryption.Hash;
import com.github.photoscript.encryption.Salt;
import com.github.photoscript.exceptions.FieldAlreadyPresent;
import com.github.photoscript.exceptions.ResourceNotFound;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
public class UsersServiceImpl implements UsersService{

  private final Logger logger = LoggerFactory.getLogger(UsersServiceImpl.class);

  @Autowired
  private UsersRepository usersRepository;

  @Override
  public List<Users> getAll() {
    List<Users> usersList = new ArrayList<>();

    try {
      usersList = usersRepository.findAll();
    } catch (DataAccessException e) {
      logger.error(e.getMessage());
    }

    return usersList;
  }

  @Override
  public Users getById(Long id) {
    Optional<Users> user = Optional.ofNullable(null);

    try {
      user = usersRepository.findById(id);
    } catch (DataAccessException e) {
      logger.error(e.getMessage());
    }

    if (user.isEmpty()) {
      throw new ResourceNotFound();
    } else {
      return user.get();
    }
  }

  @Override
  public Users createUser(Users user) throws NoSuchAlgorithmException {
    if(usersRepository.existsUserByEmail(user.getEmail())) {
      throw new FieldAlreadyPresent("Email already in use");
    }

    String password = user.getPassword();
    String salt = String.valueOf(Salt.getSaltCode());
    user.setSalt(salt);
    password += salt;
    password = Hash.getHex(password);
    user.setPassword(password);

    Users postedUser = null;

    try {
      postedUser = usersRepository.save(user);
    } catch (DataAccessException e) {
      logger.error(e.getMessage());
    }

    return postedUser;
  }

  @Override
  public Users updateUser(Long id, Users user) {
    Users updatedUser = null;

    try {
      Optional<Users> userToUpdate = usersRepository.findById(id);
      if(userToUpdate.isEmpty()) {
        throw new ResourceNotFound();
      } else {
        updatedUser = usersRepository.save(user);
      }
    } catch (DataAccessException e) {
      logger.error(e.getMessage());
    }

    return updatedUser;
  }

  @Override
  public void deleteUser(Long id) {
    try {
      usersRepository.deleteById(id);
    } catch (DataAccessException e) {
      logger.error(e.getMessage());
    }
  }

  @Override
  public Users getUserByEmail(String email) {
    Users result;
    try {
      result = usersRepository.findByEmail(email);
    } catch (Exception e) {
      throw new ResourceNotFound("Could not locate a user with the email: " + email);
    }

    return result;
  }
}
