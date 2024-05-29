package spring.vaadin.components;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.shared.Registration;
import spring.vaadin.events.MyClientFocusEvent;
import spring.vaadin.events.MyClientKeyPressEvent;

public class MyTextField extends TextField {
    public MyTextField(String label, String placeHolder) {
        super(label, placeHolder);
    }

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        Notification.show("Attached", 1_000, Notification.Position.MIDDLE);
    }

    public Registration addMyClientKeyPressListener(ComponentEventListener<MyClientKeyPressEvent> listener) {
        return addListener(MyClientKeyPressEvent.class, listener);
    }

    public Registration addMyClientFocusListener(ComponentEventListener<MyClientFocusEvent> listener) {
        return addListener(MyClientFocusEvent.class, listener);
    }
}
