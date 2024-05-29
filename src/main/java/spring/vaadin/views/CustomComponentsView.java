package spring.vaadin.views;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import spring.vaadin.components.MyComposite;
import spring.vaadin.components.MyMUIButton;
import spring.vaadin.components.MyTextField;
import spring.vaadin.components.PaperSlider;
import spring.vaadin.events.MyBackgroundColorEvent;

@Route("customComponents")
public class CustomComponentsView extends VerticalLayout {

    public CustomComponentsView() {
        MyComposite myComposite = new MyComposite();

        Button button = new Button("Set text");
        button.addClickListener(e -> {
            myComposite.setSpanText(myComposite.getSpanText() + " Text");
            fireEvent(new MyBackgroundColorEvent(myComposite, false)); // TODO: 5/29/24 Firing from the server
        });

        MyTextField textField = new MyTextField("Text", "Text");
        textField.addMyClientKeyPressListener(event -> System.err.println(event.toString()));// TODO: 5/29/24 adding client Listener with MyClientEvent
        textField.addMyClientFocusListener(event -> System.out.println(event.toString()));// TODO: 5/29/24 adding client Listener with MyClientEvent
        textField.addAttachListener(e -> Notification.show("Attach Listener", 1_000, Notification.Position.BOTTOM_CENTER));
        textField.addDetachListener(e -> Notification.show("Detach Listener", 1_000, Notification.Position.BOTTOM_CENTER));

        textField.getElement().addEventListener("click",
                e -> Notification.show("Hey", 1_000, Notification.Position.BOTTOM_CENTER));// TODO: 5/29/24 adding client Listener with MyClientEvent

        String firstText = "Detach MyTextField";
        Button detachBut = new Button(firstText);
        detachBut.addClickListener(event -> {
            if (textField.isAttached()) {
                textField.removeFromParent();
                detachBut.setText("Attach MyTextField");
            } else {
                add(textField);
                detachBut.setText(firstText);
            }
        });

        PaperSlider paperSlider = new PaperSlider();
//        MyMUIButton myMUIButton = new MyMUIButton();
        paperSlider.addClickListener(e -> System.err.println(e.toString()));

        add(myComposite, button, textField, detachBut, paperSlider);
    }
}
