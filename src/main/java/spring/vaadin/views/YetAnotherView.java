package spring.vaadin.views;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.accordion.Accordion;
import com.vaadin.flow.component.accordion.AccordionPanel;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.router.Route;
import spring.vaadin.components.MyCustomField;
import spring.vaadin.components.MyRouter;

import java.time.Duration;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Locale;


@Route(value = "yetAnother", layout = MyRouter.class)
@Tag("div")
public class YetAnotherView extends VerticalLayout {
    public YetAnotherView() {
        TimePicker timePicker = new TimePicker(LocalTime.NOON);
        timePicker.setLocale(Locale.ITALY);
        timePicker.setStep(Duration.of(15, ChronoUnit.MINUTES));

        MemoryBuffer memoryBuffer = new MemoryBuffer();
        Upload upload = new Upload(memoryBuffer);
        upload.setAcceptedFileTypes("txt");

        MyCustomField myCustomField = new MyCustomField();
        myCustomField.setPresentationValue(List.of("Greg"));

        Accordion accordion = new Accordion();
        AccordionPanel time_picker = accordion.add("Time picker", timePicker);
        AccordionPanel myCustom_field = new AccordionPanel("MyCustom field", myCustomField);
        myCustom_field.setEnabled(false);
        accordion.add(myCustom_field);
        accordion.open(1);

        ContextMenu contextMenu = new ContextMenu(time_picker);
        MenuItem first = contextMenu.addItem("First");
        MenuItem second = contextMenu.addItem("Second");
        first.setEnabled(false);
        second.add(new Span("Span"));
        second.setCheckable(true);

        Details details = new Details("Details", new TextArea("Put something here", "Something"));

        Dialog dialog = new Dialog("Some dialog header");
        dialog.setModal(false);
        dialog.setDraggable(true);
        dialog.getFooter().add(new Span("Footer"));

        Button open_dialog = new Button("Open Dialog", e -> dialog.open());

        Notification notification = new Notification("Notification 1sec", 1000, Notification.Position.BOTTOM_CENTER);

        Button open_notification = new Button("Open Notification", e -> notification.open());

        ProgressBar progressBar = new ProgressBar(1, 2, 1.12);
        progressBar.setIndeterminate(true);

        Tab tab1 = new Tab("first");
        Tab tab2 = new Tab("second");
        tab1.setFlexGrow(2);
        Tabs tabs = new Tabs(tab1, tab2);
        tabs.setOrientation(Tabs.Orientation.VERTICAL);
        tabs.setSelectedTab(tab2);

        Icon icon = new Icon(VaadinIcon.AT);

        add(icon, accordion, contextMenu, details, open_dialog, open_notification, progressBar, tabs);
    }
}
