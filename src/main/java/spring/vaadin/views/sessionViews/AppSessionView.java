package spring.vaadin.views.sessionViews;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

public class AppSessionView extends VerticalLayout {
    public AppSessionView() {
        TextField textField = new TextField("TextField");
        add(textField);
    }
}
