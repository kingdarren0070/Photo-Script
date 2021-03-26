package com.github.photoscript.encryption;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Hash {
  public static String getHex(String password) throws NoSuchAlgorithmException {
    MessageDigest digester = MessageDigest.getInstance("SHA-256");
    byte[] hashedPassword = digester.digest(password.getBytes(StandardCharsets.UTF_8));
    String hexPassword = bytesToHex(hashedPassword);
    return hexPassword;
  }

  private static String bytesToHex(byte[] hash) {
    StringBuffer hexString = new StringBuffer();
    for(int i = 0; i < hash.length; i++) {
      String hex = Integer.toHexString(0xff & hash[i]);
      if(hex.length() == 1) {
        hexString.append('0');
      }
      hexString.append(hex);
    }
    return hexString.toString();
  }
}
