package com.github.photoscript.encryption;

import java.security.SecureRandom;
import java.util.Random;

public class Salt {
  private static final Random RANDOM = new SecureRandom();

  public static byte[] getSaltCode() {
    byte[] salt = new byte[32];
    RANDOM.nextBytes(salt);
    return salt;
  }
}
