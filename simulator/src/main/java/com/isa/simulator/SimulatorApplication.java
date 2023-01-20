package com.isa.simulator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;

@EnableRabbit
@SpringBootApplication
public class SimulatorApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(SimulatorApplication.class, args);
	}
}
