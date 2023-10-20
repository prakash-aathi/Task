package com.assignment.sunbase.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.sunbase.dto.CustomerReuest;
import com.assignment.sunbase.dto.LoginRequest;
import com.assignment.sunbase.feign.SunbaseInterface;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    private final SunbaseInterface sunbaseInterface;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        return sunbaseInterface.login(loginRequest);
    }

    @PostMapping("/createCustomer")
    public String createCustomer(@RequestBody CustomerReuest customerReuest,
            @RequestHeader("Authorization") String token) {
        return sunbaseInterface.createCustomer(customerReuest, token, "create");
    }


    @GetMapping("/getCustomerList")
    public String getCustomerList(@RequestHeader("Authorization") String token) {
        return sunbaseInterface.getCustomerList(token, "get_customer_list");
    }

    @PostMapping("/deleteCustomer")
    public String deleteCustomer(@RequestHeader("Authorization") String token, @RequestParam("uuid") String uuid) {
        return sunbaseInterface.deleteCustomer(token, "delete", uuid);
    }

    @PostMapping("/updateCustomer")
    public String updateCustomer(@RequestHeader("Authorization") String token, @RequestParam("uuid") String uuid,
            @RequestBody CustomerReuest customerReuest) {
        return sunbaseInterface.updateCustomer(token, "update", uuid, customerReuest);
    }

}
