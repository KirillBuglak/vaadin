package spring.vaadin.views;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.page.History;
import com.vaadin.flow.router.Route;

@Route("showHistory")
public class HistoryView extends VerticalLayout {
    public HistoryView() {
        History history = UI.getCurrent().getPage().getHistory();
//        history.go(-1);
        history.setHistoryStateChangeHandler(e -> add(new Span(e.getLocation().getPath())));
    }
}
