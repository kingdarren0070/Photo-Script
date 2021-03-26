package com.github.photoscript.domains.users;

import com.github.photoscript.domains.users.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
  boolean existsUserByEmail(String email);

  Users findByEmail(String email);
}
