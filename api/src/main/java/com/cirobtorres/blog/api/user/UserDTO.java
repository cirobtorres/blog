package com.cirobtorres.blog.api.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserDTO (
        @NotBlank(message = "Required") String name,
        @NotBlank(message = "Required") @Email(message = "Invalid") String email,
        @NotBlank(message = "Required") String password
) {
    public UserDTO (String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getName() {
        return name;
    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
}
