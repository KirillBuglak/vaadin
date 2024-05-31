package spring.vaadin.views;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.VaadinSession;
import spring.vaadin.broadcasting.BroadCaster;

@Route("broadCasting")
public class BroadcastView extends VerticalLayout {

    VerticalLayout layout = new VerticalLayout();

    public BroadcastView() {
        TextField message = new TextField("Message", "Enter your message");
        Button button = new Button("Send message", e -> {
            String value = message.getValue();
            UI ui = getUI().get();
            ui.access(() -> {
                BroadCaster.addMessage(value);
                BroadCaster.refreshComponents();
            });
            message.clear();
        });

        add(layout, message, button);
    }

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        BroadCaster.addComponent(this);
        BroadCaster.addSession(VaadinSession.getCurrent());
        BroadCaster.getStrings().forEach(e -> {
            getElement().insertChild(0, new Span(e).getElement());
        });
    }
}
