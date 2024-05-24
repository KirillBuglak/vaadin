package spring.vaadin.views;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.*;
import jakarta.servlet.http.HttpServletResponse;
import spring.vaadin.components.RouterParentLayout;
import spring.vaadin.utils.LinkUtils;

@Tag(Tag.DIV)
@ParentLayout(RouterParentLayout.class) //todo allows to show this layout even when we have an error
public class HasErrorView extends RouteNotFoundError { //todo custom error page
    @Override
    public int setErrorParameter(BeforeEnterEvent event, ErrorParameter parameter) {
        getElement().setText("Oops, looks like we have a problem here, those are the available routes");
        VerticalLayout verticalLayout = new VerticalLayout();
        LinkUtils.getRoutes().forEach(e ->
                verticalLayout.add(
                        new RouterLink(e.getTemplate(), e.getNavigationTarget())));
        getElement().appendChild(verticalLayout.getElement());
        return HttpServletResponse.SC_NOT_FOUND;
    }
}
