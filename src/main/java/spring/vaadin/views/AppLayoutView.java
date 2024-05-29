package spring.vaadin.views;

import com.vaadin.flow.component.Unit;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.login.LoginOverlay;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Route("appLayout")
@RouteAlias("appLayout1")
public class AppLayoutView extends AppLayout {
    public AppLayoutView() {
        setPrimarySection(Section.DRAWER);
        Icon icon = new Icon(VaadinIcon.ABACUS);

        TextField textField = new TextField("TextField");

        FormLayout formLayout = new FormLayout();
        formLayout.add("one");
        formLayout.add(new Span("Span"), 3);
        TextField textField1 = new TextField("TextField");
        formLayout.add(textField1, 5);
        formLayout.setResponsiveSteps(List.of(new FormLayout.ResponsiveStep("0", 1),
                new FormLayout.ResponsiveStep("1", 2),
                new FormLayout.ResponsiveStep("2", 3)
        ));
        Style style = formLayout.getStyle().setBorder("1px solid #9E9E9E");

        SplitLayout splitLayout = new SplitLayout(SplitLayout.Orientation.VERTICAL);
        splitLayout.addToPrimary(new Span("primary"));
        splitLayout.addToSecondary(new Span("Secondary"));
        splitLayout.setHeight(300, Unit.PIXELS);

        VerticalLayout verticalLayout = new VerticalLayout();
        verticalLayout.add(formLayout, splitLayout);

        LoginForm loginForm = new LoginForm();
        AtomicBoolean showLogForm = new AtomicBoolean(false);
        Button loginFormButton = new Button("LoginForm", e -> {
            if (showLogForm.get()) {
                verticalLayout.remove(loginForm);
                showLogForm.set(false);
            } else {
                showLogForm.set(true);
                verticalLayout.add(loginForm);}});

        LoginOverlay loginOverlay = new LoginOverlay(); //fixme Doesn't Work
        AtomicBoolean showLogOver = new AtomicBoolean(false);
        Button loginOverButton = new Button("LoginOverlay", e -> {
            if (showLogOver.get()) {
                verticalLayout.remove(loginOverlay);
                showLogOver.set(false);
            } else {
                showLogOver.set(true);
                verticalLayout.add(loginOverlay);}});

        addToNavbar(icon, loginFormButton, loginOverButton);
        addToDrawer(textField);
        setContent(verticalLayout);
    }
}
