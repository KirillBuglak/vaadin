package spring.vaadin.views;

import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.dom.Element;
import com.vaadin.flow.router.Route;

@Route("some")
public class MainView extends VerticalLayout {
    public MainView() {
        Span span = new Span();
        TextField textField = new TextField(e ->
                span.setText("Hello " + e.getValue()));
        textField.setPlaceholder("Enter your name here");
        textField.setClearButtonVisible(true);
        textField.setMinLength(2);
        textField.setAutofocus(true);
        textField.setLabel("User's name");
        textField.setErrorMessage("Oops!");
        Button button = new Button("Click it",
                e -> Notification.show("You've clicked the button"));
        button.addThemeVariants(ButtonVariant.LUMO_SUCCESS);
        button.addClickShortcut(Key.KEY_C);

        EmailField emailField = new EmailField("Email", "some@mail.com");
        emailField.setRequiredIndicatorVisible(true);

        NumberField numberField = new NumberField("Money", "0");
        numberField.setPrefixComponent(new Span("$"));
        numberField.setStep(2);

        PasswordField passwordField = new PasswordField("Password");
        passwordField.setRequired(true);
        passwordField.setRevealButtonVisible(true);

        Checkbox checkbox = new Checkbox("Check it out");
        checkbox.setValue(true);

        RadioButtonGroup<String> radioButtonGroup = new RadioButtonGroup<>("Radio");
        radioButtonGroup.setAriaLabel("Label");
        radioButtonGroup.setItems("Greg", "John", "Mike");

        add(textField);
        add(emailField);
        add(radioButtonGroup);
        add(passwordField);
        add(span);
        add(numberField);
        add(button);
        add(checkbox);

        Element parent = span.getElement().getParent();
        parent.getStyle().setBackgroundColor("#f0fcfc");
    }
}
