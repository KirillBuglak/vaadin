package spring.vaadin.embedded.exporters;

import com.vaadin.flow.component.WebComponentExporter;
import com.vaadin.flow.component.webcomponent.WebComponent;
import spring.vaadin.embedded.components.MyComponent;

public class MyWbExporter extends WebComponentExporter<MyComponent> {
    protected MyWbExporter() {
        super("my-component");
    }

    @Override
    protected void configureInstance(WebComponent<MyComponent> webComponent, MyComponent component) {

    }
}
