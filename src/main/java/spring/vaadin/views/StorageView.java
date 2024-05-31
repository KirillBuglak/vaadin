package spring.vaadin.views;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.page.WebStorage;
import com.vaadin.flow.router.Route;

@Route("storageView")
public class StorageView extends VerticalLayout {

    public StorageView() { // TODO: 5/31/24 Cool ability to store some properties in the browser!!!
        Button local = new Button("save to UI", e -> WebStorage.setItem(WebStorage.Storage.LOCAL_STORAGE, "local", "local"));
        Button session = new Button("save to session", e -> WebStorage.setItem(WebStorage.Storage.SESSION_STORAGE, "session", "session"));

        add(local, session);
    }

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        WebStorage.getItem(WebStorage.Storage.LOCAL_STORAGE, "local",
                e -> add(new Span("local - " + e)));
        WebStorage.getItem(WebStorage.Storage.SESSION_STORAGE, "session",
                e -> add(new Span("session - " + e)));
    }
}
