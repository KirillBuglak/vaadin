package spring.vaadin.broadcasting;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.server.VaadinSession;
import org.springframework.context.annotation.Scope;

import java.util.LinkedList;

@Scope("singleton")
public class BroadCaster {

    private static LinkedList<String> strings= new LinkedList<>();
    private static LinkedList<Component> components = new LinkedList<>();
    private static LinkedList<VaadinSession> sessions = new LinkedList<>();



    public static synchronized void addMessage(String m) {
        strings.add(m);
    }
    public static synchronized void addSession(VaadinSession m) {
        if (!sessions.contains(m)) {
            sessions.add(m);
        }
    }

    public static synchronized LinkedList<String> getStrings() {
        return strings;
    }

    public static synchronized void addComponent(Component c) {
        components.add(c);
    }

    public static void refreshComponents() {
        sessions.forEach(VaadinSession::lock);
        components.forEach(e -> e.getElement().insertChild(0, new Span(strings.getLast()).getElement()));
        sessions.forEach(s -> s.getUIs().forEach(UI::push));// TODO: 5/31/24 If pushMode is AUTOMATIC - we can get rid of this line
        sessions.forEach(VaadinSession::unlock);
    }
}
