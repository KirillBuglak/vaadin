package spring.vaadin.views;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.listbox.ListBox;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;
import spring.vaadin.components.MyRouter;

import java.time.LocalDate;
import java.util.Locale;


@Route(value = "another", layout = MyRouter.class)
@Tag("div")
public class AnotherView extends VerticalLayout {
    public AnotherView() {
        ListBox<String> listBox = new ListBox<>();
        listBox.setItems("One", "Two", "Three");

        Select<String> select = new Select<>("Select", null, "a", "b", "c");

        ComboBox<String> comboBox = new ComboBox<>("Combo", "Q", "R", "S");
        comboBox.setPageSize(2);
        comboBox.setAllowCustomValue(true);

        DatePicker datePicker = new DatePicker(LocalDate.of(2025, 2, 2));
        datePicker.setMax(LocalDate.of(2025, 3, 2));
        datePicker.setLocale(Locale.GERMANY);

        add(listBox, select, comboBox, datePicker);
    }
}
