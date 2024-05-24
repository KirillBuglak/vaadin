package spring.vaadin.views;

import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.*;

@Route("queryParameter")
public class QueryParameterView extends VerticalLayout implements HasUrlParameter<String> {

    @Override
    public void setParameter(BeforeEvent event, @OptionalParameter String parameter) {
        add(new Span("Hello " + (parameter != null ? parameter : "Guest")));
        QueryParameters queryParameters = event.getLocation().getQueryParameters();
        add(new Span("Query params: " + queryParameters.getParameters()));
    }
}
