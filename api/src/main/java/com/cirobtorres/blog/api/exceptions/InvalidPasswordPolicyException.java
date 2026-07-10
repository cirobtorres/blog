package com.cirobtorres.blog.api.exceptions;

public class InvalidPasswordPolicyException extends RuntimeException {
  public InvalidPasswordPolicyException(String message) {
    super(message);
  }
}