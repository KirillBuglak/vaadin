package spring.vaadin.components;

import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.ParentLayout;
import com.vaadin.flow.router.RoutePrefix;
import com.vaadin.flow.router.RouterLayout;

@RoutePrefix(value = "router")
@ParentLayout(RouterParentLayout.class) //todo allows to make another layout static
public class MyRouter extends VerticalLayout implements RouterLayout {
    public MyRouter() {
        getStyle().setBorder("1px solid red");
        add(new Span("Parent router layout" + System.currentTimeMillis()));
    }
}
