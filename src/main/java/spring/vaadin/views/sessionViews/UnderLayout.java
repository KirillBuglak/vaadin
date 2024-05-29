package spring.vaadin.views.sessionViews;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.RouteConfiguration;
import com.vaadin.flow.server.VaadinSession;

public class UnderLayout extends HorizontalLayout {
    public UnderLayout() {
        add(new Button("Log out", e -> {
            VaadinSession.getCurrent().setAttribute("login", null);
            VaadinSession.getCurrent().setAttribute("password", null);

            RouteConfiguration.forSessionScope().removeRoute("info");

            UI.getCurrent().navigate("login");
        }));
    }
}
