package spring.vaadin.views;

import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.*;
import spring.vaadin.components.MyRouter;
import spring.vaadin.utils.LinkUtils;

@Route(value = "beforeEnterAfterNav", layout = MyRouter.class)
public class BeforeEnterAfterNavView extends VerticalLayout implements BeforeEnterObserver, AfterNavigationObserver {
    private Span span = new Span("here you are");

    public BeforeEnterAfterNavView() {
//        Html html = LinkUtils.getLink(BeforeLeaveView.class, null, "forward");
//        add(html);
    }

    @Override
    public void beforeEnter(BeforeEnterEvent event) {
        ConfirmDialog dialog = new ConfirmDialog();
        dialog.setHeader("Are you sure");
        dialog.setConfirmButton(new Button("Yes", e -> {
            add(span, LinkUtils.getLink(BeforeLeaveView.class, "go to beforeLeave", null));
        }));
        dialog.setCancelButton(new Button("No",
//                e -> UI.getCurrent().getPage()
//                .executeJs("document.getElementById('forward').click()")
                e -> UI.getCurrent().navigate(BeforeLeaveView.class)//todo much easier approach than creating invisible components
        ));
        dialog.setCancelable(true);
        dialog.open();

    }

    @Override
    public void afterNavigation(AfterNavigationEvent event) {
        add(new Anchor(LinkUtils.getURL(BeforeLeaveView.class), "after navigation go to beforeLeave"));
    }
}
