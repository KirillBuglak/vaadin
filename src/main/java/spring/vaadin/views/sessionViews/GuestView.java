package spring.vaadin.views.sessionViews;

import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("info")
public class GuestView extends VerticalLayout {
    public GuestView() {
        add(new Span("You are a Guest"));
    }
}
