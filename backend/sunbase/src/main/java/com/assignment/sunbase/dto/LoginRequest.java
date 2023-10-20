package com.assignment.sunbase.dto;

import lombok.Data;

@Data
public class LoginRequest {
    
    private String login_id;
    private String password;
}
