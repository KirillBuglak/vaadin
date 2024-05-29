package spring.vaadin.views.sessionViews;

import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.spring.annotation.VaadinSessionScope;

@Route(value = "info", registerAtStartup = false)
@VaadinSessionScope
public class AdminView extends UnderLayout {
    public AdminView() {
        add(new Span("You are an admin"));
    }
}
