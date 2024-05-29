package spring.vaadin.events;

import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.DebounceSettings;
import com.vaadin.flow.component.DomEvent;
import com.vaadin.flow.component.EventData;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.dom.DebouncePhase;
import spring.vaadin.components.PaperSlider;

@DomEvent(value = "click", //todo Works
        debounce = @DebounceSettings(timeout = 1_000, //todo Limiting Event Frequency
                phases = DebouncePhase.INTERMEDIATE)
)
public class MyClientClickEvent extends ComponentEvent<PaperSlider> {

    public MyClientClickEvent(PaperSlider source,
                              boolean fromClient,
                              @EventData("event.button") int button) {
        super(source, fromClient);
        source.getStyle().setBackgroundColor("green");
        Notification.show("Clicked", 1_000, Notification.Position.TOP_CENTER);
    }
}
