package spring.vaadin.views;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;

//@Route(registerAtStartup = false) //todo we can just omit this annotation and the result would be the same
public class AppUnsignedView extends VerticalLayout {
    public AppUnsignedView() {
        TextField textField = new TextField("TextField");
        add(textField);
    }
}
