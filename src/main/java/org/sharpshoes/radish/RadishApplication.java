package org.sharpshoes.radish;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@ComponentScan({"org.sharpshoes.radish"})
@MapperScan("org.sharpshoes.radish.mapper")
@EnableTransactionManagement
@EnableAutoConfiguration
@SpringBootApplication
@ServletComponentScan("org.sharpshoes.radish.web")
public class RadishApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(RadishApplication.class, args);
	}
}
