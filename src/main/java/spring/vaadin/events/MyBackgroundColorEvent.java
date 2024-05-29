package spring.vaadin.events;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEvent;

public class MyBackgroundColorEvent extends ComponentEvent<Component> {
    /**
     * Creates a new event using the given source and indicator whether the
     * event originated from the client side or the server side.
     *
     * @param source     the source component
     * @param fromClient <code>true</code> if the event originated from the client
     *                   side, <code>false</code> otherwise
     */
    public MyBackgroundColorEvent(Component source, boolean fromClient) {
        super(source, fromClient);
        source.getStyle().setBackgroundColor("red");
    }
}
