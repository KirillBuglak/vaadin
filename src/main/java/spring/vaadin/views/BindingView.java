package spring.vaadin.views;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.binder.PropertyId;
import com.vaadin.flow.data.binder.Result;
import com.vaadin.flow.data.binder.ValueContext;
import com.vaadin.flow.data.converter.Converter;
import com.vaadin.flow.data.provider.ConfigurableFilterDataProvider;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.provider.ListDataProvider;
import com.vaadin.flow.data.provider.SortDirection;
import com.vaadin.flow.data.validator.DateRangeValidator;
import com.vaadin.flow.data.validator.StringLengthValidator;
import com.vaadin.flow.router.Route;
import spring.vaadin.data.Person;
import spring.vaadin.data.ProductClass;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Predicate;

@Route("bindingStuff")
public class BindingView extends VerticalLayout {

    static class MyConverter implements Converter<String, Boolean> {

        @Override
        public Result<Boolean> convertToModel(String value, ValueContext context) {
            try {
                return Result.ok("adult".equals(value));
            } catch (Exception e) {
                return Result.error(e.getMessage());
            }
        }

        @Override
        public String convertToPresentation(Boolean value, ValueContext context) {
            return value ? "he is an adult" : "do not think so";
        }
    }

    @PropertyId("name") //todo Useful for autoBinding only
    private TextField namer;
    @PropertyId("gender") //todo Useful for autoBinding only
    private RadioButtonGroup<String> genderr;
    @PropertyId("dob") //todo Useful for autoBinding only
    private DatePicker doBr;

    public BindingView() {
        FormLayout formLayout = new FormLayout();
        TextField name = new TextField("Name");
        RadioButtonGroup<String> gender = new RadioButtonGroup<>("Gender", "man", "woman");

        DatePicker doB = new DatePicker("DoB");

        TextField isAdult = new TextField("is adult?");


        Binder<Person> personBinder = new Binder<>(Person.class);
//        personBinder.bindInstanceFields(this); //todo Can use this for auto binding on same fields names
        personBinder.withValidator(p -> p.getDob() != null, "Should have DoB"); //todo Validating the whole object
        Binder.Binding<Person, String> nameBinding = personBinder.forField(name)
                .withValidator(new StringLengthValidator("Better have a longer name", 4, 6))
                .asRequired("Put your name here")
                .bind("name");
        personBinder.forField(doB)
                .withValidator(new DateRangeValidator("Can't be that young",
                        LocalDate.of(2010, 1, 1),
                        LocalDate.of(2015, 1, 1)))
                .withValidationStatusHandler(statusChange -> {
                    Notification notification = new Notification(statusChange.getMessage().orElse(""),
                            1000, Notification.Position.TOP_START);
                    if (statusChange.isError()) notification.open();
                })
                .bind("dob");
        personBinder.bind(gender, Person::getGender, Person::setGender);
        personBinder.forField(isAdult)
                .withConverter("adult"::equals, k -> k ? "adult" : "do not think so", "Can't convert")
//                .withConverter(new MyConverter()) //todo works the same as the line above
                .withValidator(e -> e, "Oops!!!")
                .bind("adult");

        doB.addValueChangeListener(e -> nameBinding.validate());

        Person person = new Person("Gr", LocalDate.now(), "man", true);
//        personBinder.readBean(person); //todo Reading Manually
        personBinder.setBean(person); //todo Allows to automatically update the bean

        Button save = new Button("Save", e -> {
            personBinder.writeBeanIfValid(person);
            Notification.show(person.toString());
        });
        save.setEnabled(false);

        personBinder.addStatusChangeListener( e -> { //todo Coll feature to disable a button until input is validated
            boolean valid = e.getBinder().isValid(); //todo Work only with setBean
            save.setEnabled(valid);
        });

        formLayout.add(name, gender, doB, isAdult, save);

        FormLayout readOnlyForm = new FormLayout();
        namer = new TextField("Name");
        genderr = new RadioButtonGroup<>("Gender", "man", "woman");
        doBr = new DatePicker("DoB");
        namer.setReadOnly(true);
        genderr.setReadOnly(true);
        doBr.setReadOnly(true);
        readOnlyForm.add(namer, genderr, doBr);
        Binder<Person> readOnlyBinder = new Binder<>(Person.class);
        readOnlyBinder.bindInstanceFields(this);//todo Can use this for auto binding on same fields names

        Person readOnlyPerson = new Person("Ann", LocalDate.now(), "woman", false);
        readOnlyBinder.readBean(readOnlyPerson);

        ComboBox<ProductClass> comboBox = new ComboBox<>();
        comboBox.setItemLabelGenerator(ProductClass::getName); //todo shows only this column instead of the whole object
        List<ProductClass> list = List.of(new ProductClass(1, "aab", LocalDateTime.now(), null),
                new ProductClass(222, "bbbbbBBBBBBBa", null, null));

        DataProvider<ProductClass, Predicate<ProductClass>> dataProvider = DataProvider.fromFilteringCallbacks(q -> {
            int offset = q.getOffset();
            int limit = q.getLimit();
            Predicate<ProductClass> filter = q.getFilter().orElse(null);
            return list.stream().skip(offset).filter(filter).limit(limit);
        }, q -> (int) list.stream().filter(q.getFilter().orElse(null)).count());

        DataProvider<ProductClass, String> convertedProvider =
                dataProvider.withConvertedFilter(e -> (k -> k.getName().startsWith(e)));//todo allows us to go with filters further

        comboBox.setItems(convertedProvider); //todo allows us to filter on the backend and fetch only filtered data to front

        Grid<ProductClass> grid = new Grid<>(ProductClass.class);

        ConfigurableFilterDataProvider<ProductClass, Void, String> configurableProvider = convertedProvider.withConfigurableFilter();
        configurableProvider.setFilter("a");
        comboBox.addValueChangeListener(e -> configurableProvider.setFilter(e.getValue().getName()));

        grid.setDataProvider(configurableProvider);

        ListDataProvider<ProductClass> listDataProvider = DataProvider.ofCollection(list);
//        listDataProvider.setFilter(e -> e.getId() != 500);//todo this is how to add filters
//        listDataProvider.addFilter(e -> e.getId() != 200);//todo this is how to add filters
        listDataProvider.setSortOrder(ProductClass::getName, SortDirection.DESCENDING);
        Grid<ProductClass> descGrid = new Grid<>(ProductClass.class);
        descGrid.setDataProvider(listDataProvider);

        add(formLayout, readOnlyForm, comboBox, grid, descGrid);
    }
}
