package com.anything.warProyect;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Start {

	private static final Logger LOGGER = LoggerFactory.getLogger(Start.class);
	
	public static void main(String[] args) {
		SpringApplication.run(Start.class, args);
		LOGGER.info("warProyect is up");
	}

}
