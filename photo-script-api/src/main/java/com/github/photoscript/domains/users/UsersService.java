package com.github.photoscript.domains.users;

import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface UsersService {
  List<Users> getAll();

  Users getById(Long id);

  Users createUser(Users user) throws NoSuchAlgorithmException;

  Users updateUser(Long id, Users user) throws NoSuchAlgorithmException;

  void deleteUser(Long id);

  Users getUserByEmail(String email);
}
