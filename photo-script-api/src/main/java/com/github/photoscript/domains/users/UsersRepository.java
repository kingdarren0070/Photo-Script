package com.github.photoscript.domains.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
  boolean existsUserByUsername(String email);

  Users findByUsername(String email);
}
