package spring.vaadin.components;

import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;

public class MyComposite extends Composite<Div> {
    public MyComposite() {
        Span firstSpan = new Span("First Span");
        Span secondSpan = new Span("Second Span");

        getContent().add(firstSpan, secondSpan);
    }
}
