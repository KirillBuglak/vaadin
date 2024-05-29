package spring.vaadin.components;

import com.vaadin.flow.component.*;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.shared.Registration;
import spring.vaadin.events.MyClientClickEvent;

@Tag("paper-slider")
@NpmPackage(value = "@polymer/paper-slider", version = "3.0.1")
@JsModule("@polymer/paper-slider/paper-slider.js")
public class PaperSlider extends AbstractSinglePropertyField<PaperSlider, Integer> {
    private static final PropertyDescriptor<Boolean, Boolean> pinProperty = PropertyDescriptors
            .propertyWithDefault("pin", false);
    public PaperSlider() {
        super("value", 0, false);
    }
    public void setPin(boolean pin) {
        pinProperty.set(this, pin);
    }
    public boolean isPin() {
        return pinProperty.get(this);
    }
    public Registration addClickListener (ComponentEventListener<MyClientClickEvent> listener) {
        return addListener(MyClientClickEvent.class, listener);
    }
    public void increment() {
        getElement().callJsFunction("increment");
    }
}
