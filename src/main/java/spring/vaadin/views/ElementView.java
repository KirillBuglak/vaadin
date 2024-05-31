package spring.vaadin.views;

import com.vaadin.flow.component.ClientCallable;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.dom.DomEvent;
import com.vaadin.flow.dom.Element;
import com.vaadin.flow.dom.ElementFactory;
import com.vaadin.flow.router.Route;
import elemental.json.JsonObject;

@Route("elementAPI")
public class ElementView extends VerticalLayout {

    Element layout = getElement();
    Element text = ElementFactory.createTextarea().setProperty("value", "text");
    Element number = new NumberField("Number").getElement();

    public ElementView() {

        Element input = ElementFactory.createInput()
                .setAttribute("id", "el")
                .setAttribute("placeholder", "Some")
                .setAttribute("autofocus", "");


        boolean boolValue = text.getProperty("value", false);
        int intValue = text.getProperty("value", 123); //todo can get various values
        text.addPropertyChangeListener("value", "change",
                e -> layout.appendChild(ElementFactory.createDiv().setText(text.getProperty("value"))));

        Element div = ElementFactory.createDiv().setText("Some div Text");
        String divText = div.getText(); //todo helper meth of Element API for div
        String divTextRecursively = div.getTextRecursively(); //todo helper meth of Element API for div

        Element but = ElementFactory.createButton("Click it");
        but.addEventListener("click", this::handleClick)
                .addEventData("event.shiftKey")
                .addEventData("element.offsetWidth");

        Button getSome = new Button("get Some",
                e -> getElement().executeJs("this.$server.doSome()")); //todo referencing @doSome meth
        getSome.addClassName("styled-button");

        String firstText = "Set previous button invisible";
        Button setInvisible = new Button(firstText);
        setInvisible.addClickListener(e -> {
            if (setInvisible.getText().startsWith("Set")) {
                setInvisible.setText("Reverse");
                getSome.addClassName("invisible-element");
            } else {
                setInvisible.setText(firstText);
                getSome.removeClassName("invisible-element");
            }
        });
        setInvisible.getStyle().setBackground("#f9dbff");

        layout.appendChild(input, text, div, but, number, getSome.getElement(), setInvisible.getElement());
    }

    private void handleClick(DomEvent domEvent) {
        number.callJsFunction("increment"); //fixme doesn't work
        number.executeJs("this.value = 3"); //todo this works great

        JsonObject eventData = domEvent.getEventData();
        boolean bool = eventData.getBoolean("event.shiftKey"); //todo hold shift while clicking te button
        double offset = eventData.getNumber("element.offsetWidth");
        layout.appendChild(ElementFactory.createDiv().setText("Yep, Shift - " + bool + " and offset - " + offset));
    }

    @ClientCallable //todo Cool thing to write functions on the back side
    public void doSome(
//            @EventData("event.shiftKey") boolean shift
    ) {
        layout.appendChild(ElementFactory.createDiv().setText("Do Some"));
    }
}
