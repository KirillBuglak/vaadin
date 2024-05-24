package spring.vaadin.views;

import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.*;

@Route("wildParameter")
public class WildParameterView extends VerticalLayout implements HasUrlParameter<String> {

    @Override
    public void setParameter(BeforeEvent event, @WildcardParameter String parameter) {
        add(new Span("Hello " + (!parameter.isEmpty() ? parameter : "Guest"))); //todo The wildcard parameter will never be null.
    }
}
