package com.assignment.sunbase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SunbaseApplication {

	public static void main(String[] args) {
		SpringApplication.run(SunbaseApplication.class, args);
	}

}
