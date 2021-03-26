package com.github.photoscript.exceptions;

public class FieldAlreadyPresent extends RuntimeException{

  public FieldAlreadyPresent() {
  }

  public FieldAlreadyPresent(String message) {
    super(message);
  }

}
