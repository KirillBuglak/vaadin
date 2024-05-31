package spring.vaadin.views;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("browserExperiments")
public class BrowserExperimentView extends VerticalLayout {
    public BrowserExperimentView() {
        UI.getCurrent().getPage().retrieveExtendedClientDetails(details -> { // TODO: 5/31/24 Useful info for components rendering
                add(new Span(details.getTimeZoneId()));
                add(new Span(details.getWindowName()));
                add(new Span(details.getCurrentDate().toString()));
                add(new Span(String.valueOf(details.getDevicePixelRatio())));
                add(new Span(String.valueOf(details.getScreenWidth())));
        });
    }
}
