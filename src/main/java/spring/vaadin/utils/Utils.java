package spring.vaadin.utils;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.router.RouteData;
import com.vaadin.flow.server.RouteRegistry;

import java.util.List;

public class Utils {
    private static RouteRegistry registry = UI.getCurrent().getInternals().getRouter().getRegistry();
    public static Html getLink(Class<? extends Component> componentClass, String linkMessage, String id) {
        String url = registry.getTargetUrl(componentClass).orElseThrow();
        StringBuilder stringBuilder = new StringBuilder("<a href='");
        stringBuilder.append(url).append("'");
        if (id != null) {
            stringBuilder.append(" id='").append(id).append("'");
        }
        stringBuilder.append(">");
        if (linkMessage != null) {
            stringBuilder.append(linkMessage);
        }
        stringBuilder.append("</a>");
        return new Html(stringBuilder.toString());
    }

    public static String getURL(Class<? extends Component> componentClass, String... params) {
        if (params != null && params.length != 0) {
            return registry.getTargetUrl(componentClass).orElseThrow() + "?some=" + params[0];
        } else {
            return registry.getTargetUrl(componentClass).orElseThrow();
        }
    }

    public static List<RouteData> getRoutes() {
        return registry.getRegisteredRoutes();
    }

    public static RouteRegistry getRegistry() {
        return registry;
    }
}
