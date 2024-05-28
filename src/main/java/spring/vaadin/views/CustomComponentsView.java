package spring.vaadin.views;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import spring.vaadin.components.MyComposite;

@Route("customComponents")
public class CustomComponentsView extends VerticalLayout {

    public CustomComponentsView() {
        MyComposite myComposite = new MyComposite();

        add(myComposite);
    }
}
