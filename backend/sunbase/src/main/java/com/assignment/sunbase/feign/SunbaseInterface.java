package com.assignment.sunbase.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import com.assignment.sunbase.dto.CustomerReuest;
import com.assignment.sunbase.dto.LoginRequest;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "sunbase", url = "https://qa2.sunbasedata.com/sunbase/portal/api/")
public interface SunbaseInterface {

    @PostMapping(value = "/assignment_auth.jsp")
    public String login(@RequestBody LoginRequest loginRequest);

    @PostMapping(value = "/assignment.jsp")
    public String createCustomer(@RequestBody CustomerReuest customerReuest,
            @RequestHeader("Authorization") String token, @RequestParam("cmd") String cmd);

    @GetMapping(value = "/assignment.jsp", produces = "application/json")
    public String getCustomerList(@RequestHeader("Authorization") String token,
            @RequestParam("cmd") String cmd);

    @PostMapping(value = "/assignment.jsp")
    public String deleteCustomer(@RequestHeader("Authorization") String token, @RequestParam("cmd") String cmd,
            @RequestParam("uuid") String uuid);

    @PostMapping(value = "/assignment.jsp")
    public String updateCustomer(@RequestHeader("Authorization") String token, @RequestParam("cmd") String cmd,
            @RequestParam("uuid") String uuid, @RequestBody CustomerReuest customerReuest);
            
}
