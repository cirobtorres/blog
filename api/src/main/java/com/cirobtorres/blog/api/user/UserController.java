package com.cirobtorres.blog.api.user;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody @Valid UserDTO userDto) {
        userService.save(userDto);
    }

    @GetMapping
    public String me(Authentication authentication) {
        return "Authenticated as: " + authentication.getName()
                + " | Authorities: " + authentication.getAuthorities();
    }
}
