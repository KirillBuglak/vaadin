package spring.vaadin;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Theme("customTheme")
@PWA(name = "Project Vaadin and Spring",
		shortName = "Vaadin-Spring")
public class VaadinApplication implements AppShellConfigurator {

	public static void main(String[] args) {
		SpringApplication.run(VaadinApplication.class, args);
	}

}
