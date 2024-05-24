package spring.vaadin.views;

import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.*;
import com.vaadin.flow.server.RouteRegistry;
import spring.vaadin.components.MyRouter;
import spring.vaadin.utils.LinkUtils;
import spring.vaadin.views.sessionViews.AppSessionView;

import java.util.Collections;

@Route(value = "beforeLeave", layout = MyRouter.class, absolute = true) //todo absolute allows to get rid of parent classes' prefixes
@PreserveOnRefresh //todo preserves content of TextField and MyRouter and it's subclasses too
@PageTitle("BeforeLeaveView")
public class BeforeLeaveView extends VerticalLayout implements BeforeLeaveObserver {

    private TextField textField;

    private final RouteRegistry registry = LinkUtils.getRegistry();

    public BeforeLeaveView() {
        textField = new TextField("Just enter smth before leaving");
        Html link = LinkUtils.getLink(BeforeEnterAfterNavView.class, "go to beforeEnter", null);

        add(new Span("Preserved on refresh " + System.currentTimeMillis()),
                textField,
                link,
                new Anchor(LinkUtils.getURL(QueryParameterView.class, "greg"), "go to query params"),
                new RouterLink("go to ParameterView", ParameterView.class, "Mark"), //todo convenient as methods in LinkUtils I've created
                new Button("Remove BeforeEnterAfterNavView",
                        e -> registry.removeRoute(BeforeEnterAfterNavView.class)),
                new Button("Add BeforeEnterAfterNavView back",
                        e -> registry.setRoute("beforeEnterAfterNav", BeforeEnterAfterNavView.class, Collections.singletonList(MyRouter.class))),
                new Button("Replace AppView",
                        e -> registry.setRoute("appLayout", AppSessionView.class, Collections.singletonList(MyRouter.class)))
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
