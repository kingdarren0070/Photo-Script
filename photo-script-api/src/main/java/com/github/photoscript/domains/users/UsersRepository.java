package com.github.photoscript.domains.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
  boolean existsUserByEmail(String email);

  Users findByEmail(String email);
}
