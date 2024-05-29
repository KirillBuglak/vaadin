package spring.vaadin.views.sessionViews;

import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.spring.annotation.VaadinSessionScope;

@Route(value = "info", registerAtStartup = false)
@VaadinSessionScope
public class UserView extends UnderLayout {
    public UserView() {
        add(new Span("You are a user"));
    }
}
