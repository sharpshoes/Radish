package org.sharpshoes.radish;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@ComponentScan({"org.sharpshoes.radish"})
@EnableTransactionManagement
@EnableAutoConfiguration
@SpringBootApplication
public class RadishApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(RadishApplication.class, args);
	}
}
