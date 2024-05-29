package spring.vaadin.components;

import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import spring.vaadin.events.MyBackgroundColorEvent;

public class MyComposite extends Composite<Div> {

    private Span span = new Span();

    public MyComposite() {
        Span firstSpan = new Span("First Span");
        Span secondSpan = new Span("Second Span");

        getContent().add(firstSpan, secondSpan, span);
    }

    public void setSpanText(String text) {
        span.setText(text);
    }

    public String getSpanText() {
        return span.getText();
    }
}
