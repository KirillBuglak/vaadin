package spring.vaadin.views;

import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.*;

@Route("parameter")
public class ParameterView extends VerticalLayout implements HasDynamicTitle, // TODO: 5/24/24  Cool feature - makes the page look professional
        HasUrlParameter<String> {

    private String title = "ParameterView - ";

    @Override
    public void setParameter(BeforeEvent event, @OptionalParameter String parameter) {
        if (parameter != null) title += parameter;
        add(new Span("Hello " + (parameter != null ? parameter : "Guest")));
    }

    @Override
    public String getPageTitle() {
        return title;
    }
}
