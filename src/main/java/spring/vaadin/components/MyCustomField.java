package spring.vaadin.components;

import com.vaadin.flow.component.customfield.CustomField;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;

import java.util.List;

public class MyCustomField extends CustomField<List<String>> {
    private final TextField textField;
    private final PasswordField passwordField;
    public MyCustomField() {
        textField = new TextField("Hey");
        passwordField = new PasswordField();

        add(textField, passwordField);
    }

    @Override
    public List<String> generateModelValue() {
        return List.of("a", "b");
    }

    @Override
    public void setPresentationValue(List<String> newPresentationValue) {
        textField.setValue(newPresentationValue.get(0));
    }
}
