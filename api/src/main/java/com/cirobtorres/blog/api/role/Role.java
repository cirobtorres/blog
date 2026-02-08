package com.cirobtorres.blog.api.role;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    private String name; // USER, AUTHOR, ADMIN, SUPER_ADMIN

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
