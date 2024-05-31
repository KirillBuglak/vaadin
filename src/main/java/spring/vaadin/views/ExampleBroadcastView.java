package spring.vaadin.views;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.webpush.WebPush;
import spring.vaadin.services.WebPushService;

@Route("exampleBroadcastView")
public class ExampleBroadcastView extends VerticalLayout {

    private final Button subscribe;
    private final Button unsubscribe;

    private final WebPushService webPushService;
    private final WebPush pushApi;


    public ExampleBroadcastView(WebPushService webPushService) {
        this.webPushService = webPushService;
        pushApi = webPushService.getWebPush();

        TextArea message = new TextArea("Message");
        Button broadcast = new Button("Broadcast message");
        subscribe = new Button("Subscribe");
        unsubscribe = new Button("UnSubscribe");

        broadcast.addClickListener(e -> webPushService.notifyAll("Some Title", "Hello everyone"));
        broadcast.addClickShortcut(Key.ENTER);

        subscribe.setEnabled(false);
        subscribe.addClickListener(e -> pushApi.subscribe(subscribe.getUI().get(),
                sub -> {
                    webPushService.store(sub);
                    subscribe.setEnabled(false);
                    unsubscribe.setEnabled(true);
                }));

        unsubscribe.setEnabled(false);
        unsubscribe.addClickListener(e -> pushApi.unsubscribe(unsubscribe.getUI().get(),
                sub -> {
                    webPushService.remove(sub);
                    subscribe.setEnabled(true);
                    unsubscribe.setEnabled(false);
                }));

        HorizontalLayout horLay = new HorizontalLayout();
        horLay.add(subscribe, unsubscribe);

        add(horLay, message, broadcast);
        setHorizontalComponentAlignment(Alignment.CENTER, message, broadcast, horLay);
    }

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        super.onAttach(attachEvent);

        UI ui = attachEvent.getUI();
        pushApi.subscriptionExists(ui, reg -> {
            subscribe.setEnabled(!reg);
            unsubscribe.setEnabled(reg);
            if (reg && webPushService.isEmpty()) {
                pushApi.fetchExistingSubscription(ui, webPushService::store);
            }
        });
    }
}
