package spring.vaadin.views;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteConfiguration;
import com.vaadin.flow.server.VaadinSession;
import spring.vaadin.views.sessionViews.AdminView;
import spring.vaadin.views.sessionViews.UserView;

@Route("login")
public class LoginView extends VerticalLayout {

    private final RouteConfiguration sessionScope = RouteConfiguration.forSessionScope();

    public LoginView() {
        LoginForm loginForm = new LoginForm();
        loginForm.addLoginListener(e -> {

            VaadinSession.getCurrent().setAttribute("login", e.getUsername());
            VaadinSession.getCurrent().setAttribute("password", e.getPassword());

            if ("admin".equalsIgnoreCase(e.getUsername())) {
                sessionScope.setRoute("info", AdminView.class);
            } else {
                sessionScope.setRoute("info", UserView.class);
            }
            UI.getCurrent().navigate("info");
        });
        add(loginForm);
    }
}
