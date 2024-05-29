package spring.vaadin.views;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.SessionDestroyEvent;
import com.vaadin.flow.server.SessionDestroyListener;
import com.vaadin.flow.server.VaadinSession;
import org.springframework.beans.factory.annotation.Autowired;
import spring.vaadin.services.SessionService;
import spring.vaadin.services.UIService;

@Route("scopes")
public class ScopesView extends VerticalLayout implements SessionDestroyListener {

    @Autowired
    public ScopesView(SessionService sessionService, UIService uiService) {
        Span span = new Span("Open two tabs and compare the contents");
        Span ui = new Span("UI service - " + uiService.getId());
        ui.getStyle().setBackgroundColor("#fee2fd");
        Span session = new Span("Session service - " + sessionService.getId());
        session.getStyle().setBackgroundColor("#cfffeb");
        Button button = new Button("End session", e -> VaadinSession.getCurrent().close());

        add(span, ui, session, button);
    }

    @Override
    public void sessionDestroy(SessionDestroyEvent event) {
        // TODO: 5/27/24 Can save user's data here
        System.err.println(event.getSession());
    }
}
