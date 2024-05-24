package spring.vaadin.components;

import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.RoutePrefix;
import com.vaadin.flow.router.RouterLayout;

@RoutePrefix("parent")
public class RouterParentLayout extends VerticalLayout implements RouterLayout {
    public RouterParentLayout() {
        getStyle().setBorder("1px solid blue");
        add(new Span("Parent for router layout" + System.currentTimeMillis()));
    }
}
