package spring.vaadin.embedded.components;

import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

public class MyComponent extends VerticalLayout {
    public MyComponent() {
        add(new Span("Embedded app"));
    }
}
