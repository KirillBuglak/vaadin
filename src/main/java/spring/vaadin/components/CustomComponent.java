package spring.vaadin.components;

import com.vaadin.flow.component.*;

import java.util.Optional;

@Tag(Tag.INPUT)
public class CustomComponent extends Component {

    private static PropertyDescriptor<String, String> VALUE = //todo PropertyDescriptor makes easier to get/set properties
            PropertyDescriptors.propertyWithDefault("value", "");

    private static PropertyDescriptor<String, Optional<String>> PLACEHOLDER = //todo used for optional attributes
            PropertyDescriptors.optionalAttributeWithDefault("placeholder", "");

    public CustomComponent(String value) {
        set(VALUE, value);
    }

    @Synchronize("change") //todo ensures that the browser sends property changes to the server.
    public String getValue() {
        return get(VALUE);
    }

    public Optional<String> getPlaceholder() {
        return get(PLACEHOLDER);
    }
    public void setPlaceholder(String placeholder) {
        set(PLACEHOLDER, placeholder);
    }
}
