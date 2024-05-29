package spring.vaadin.views;

import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.*;
import com.vaadin.flow.server.RouteRegistry;
import com.vaadin.flow.server.SessionDestroyEvent;
import com.vaadin.flow.server.SessionDestroyListener;
import spring.vaadin.components.MyRouter;
import spring.vaadin.utils.Utils;

import java.util.Collections;

@Route(value = "beforeLeave", layout = MyRouter.class, absolute = true) //todo absolute allows to get rid of parent classes' prefixes
@PreserveOnRefresh //todo preserves content of TextField and MyRouter and it's subclasses too
@PageTitle("BeforeLeaveView")
public class BeforeLeaveView extends VerticalLayout implements BeforeLeaveObserver {

    private TextField textField;

    private final RouteRegistry registry = Utils.getRegistry();

    public BeforeLeaveView() {

        RouteConfiguration.forSessionScope().addRoutesChangeListener(e -> Notification.show("changed - " + e.getAddedRoutes()));

        textField = new TextField("Just enter smth before leaving");
        Html link = new Html("<a href='http://localhost:8080/parent/router/beforeEnterAfterNav'>go to beforeEnter</a>");

        RouteConfiguration routeConfiguration = RouteConfiguration.forApplicationScope();
        add(new Span("Preserved on refresh " + System.currentTimeMillis()),
                textField,
                link,
                new Anchor(Utils.getURL(QueryParameterView.class, "greg"), "go to query params"),
                new RouterLink("go to ParameterView", ParameterView.class, "Mark"), //todo convenient as methods in LinkUtils I've created
                new Button("Remove BeforeEnterAfterNavView",
                        e -> routeConfiguration.removeRoute(BeforeEnterAfterNavView.class)),
                new Button("Add BeforeEnterAfterNavView back",
                        e -> routeConfiguration.setRoute("parent/router/beforeEnterAfterNav", BeforeEnterAfterNavView.class, Collections.singletonList(MyRouter.class))),
                new Button("Replace AppView",
                        e -> registry.setRoute("appLayout", AppUnsignedView.class, Collections.singletonList(MyRouter.class))),
                new Button("Add AppView to 'appLayout2' path",
                        e -> routeConfiguration.setRoute("appLayout2", AppUnsignedView.class, Collections.singletonList(MyRouter.class))),
                new Button("Execute JS",
                        e -> UI.getCurrent().getPage().executeJs("const header = document.createElement(\"h1\");" +
                                "const  headerText = document.createTextNode($0);" + // TODO: 5/27/24 using parameter $0
                                "header.appendChild(headerText);" +
                                "document.body.prepend(header)", "Hey Greg"))
        );
    }

    @Override
    public void beforeLeave(BeforeLeaveEvent event) { //todo use arrows to get back - do not touch URL
        BeforeLeaveEvent.ContinueNavigationAction continueEvent = event.postpone();
        ConfirmDialog dialog = new ConfirmDialog();
        dialog.setText("Do you want to save the data? " + textField.getValue());
        dialog.addConfirmListener(e -> continueEvent.proceed());
        dialog.open();
    }
}
