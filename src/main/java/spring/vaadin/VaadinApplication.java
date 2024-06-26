package spring.vaadin;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.shared.communication.PushMode;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Theme("customTheme")
@PWA(name = "Project Vaadin and Spring",
		shortName = "Vaadin-Spring",
		iconPath = "icons/icon.png",
		offlinePath = "offline-stub.html",
		offlineResources = {"icons/offline.png"},
		description = "description",
		backgroundColor = "blue",
		themeColor = "#d4fd21",
		startPath = "start")
@Push(PushMode.MANUAL) // TODO: 5/31/24 Really works - if MANUAL - haz to push to each ui yourself
public class VaadinApplication implements AppShellConfigurator {

	public static void main(String[] args) {
		SpringApplication.run(VaadinApplication.class, args);
	}

}
