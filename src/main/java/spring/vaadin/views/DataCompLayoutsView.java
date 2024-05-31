package spring.vaadin.views;

import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridMultiSelectionModel;
import com.vaadin.flow.component.grid.GridVariant;
import com.vaadin.flow.component.grid.HeaderRow;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.data.provider.CallbackDataProvider;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.provider.QuerySortOrder;
import com.vaadin.flow.data.renderer.*;
import com.vaadin.flow.router.Route;
import spring.vaadin.components.MyRouter;
import spring.vaadin.data.ProductClass;
import spring.vaadin.data.Some;

import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@Route(value = "gridAndThing", layout = MyRouter.class)
public class DataCompLayoutsView extends VerticalLayout {
    public DataCompLayoutsView() {
        List<ProductClass> products = new ArrayList<>(List.of(new ProductClass(1, "Candy", LocalDateTime.now(),
                        new Some("Greg")),
                new ProductClass(2, "Bread", LocalDateTime.now().plusDays(1), new Some("Greg"))));
        Grid<ProductClass> grid = new Grid<>(ProductClass.class, false);

        DataProvider<ProductClass, Void> dataProvider = new CallbackDataProvider<>(//todo Using it to Lazy load the data
                e -> {
                    e.getLimit();
                    e.getOffset();
                    return products.stream();},
                e -> products.size());

        grid.setItems(dataProvider);
//        grid.setColumns("name", "CDAT");
        grid.appendFooterRow();
        grid.appendHeaderRow();
        grid.prependFooterRow();
        HeaderRow headerRow = grid.prependHeaderRow();
//        grid.removeColumnByKey("id");
        GridMultiSelectionModel<ProductClass> gridSelectionModel = (GridMultiSelectionModel<ProductClass>) grid.setSelectionMode(Grid.SelectionMode.MULTI);
        gridSelectionModel.setDragSelect(true);
        gridSelectionModel.addMultiSelectionListener(e -> Notification.show(e.getAllSelectedItems().toString()));
        Set<ProductClass> selectedItems = grid.getSelectedItems();
        grid.addItemDoubleClickListener(e -> {
            products.add(new ProductClass(e.getItem().getId()*4, e.getItem().getName(), e.getItem().getCDAT(), null));
            dataProvider.refreshAll();});
        grid.setColumns("name", "CDAT");
        HeaderRow.HeaderCell join = headerRow.join(grid.getColumnByKey("name"), grid.getColumnByKey("CDAT"));
        join.setText("HeaderText");
        grid.addColumn(ProductClass::toString)
                .setHeader("Summary")
                .setFooter("SummaryFooter")
                .setSortable(true);
        grid.getColumnByKey("name").setFooter(new Html("<b>Greg</b>"));
        grid.addColumn(LitRenderer
                .<ProductClass>of("<button @click=${handleClick}>Hey</button>")
                .withFunction("handleClick",
                        e -> Notification.show(e.toString()).setPosition(Notification.Position.TOP_CENTER)))
                .setHeader("buttons");
        grid.addColumn(new ComponentRenderer<>(() -> new TextField("Comment label")))
                .setHeader("Comment");
        grid.setItemDetailsRenderer(new ComponentRenderer<>(e -> {
            HorizontalLayout horizontalLayout = new HorizontalLayout();
            Span span = new Span(e.getName());
            TextField textField = new TextField("Some additional info", "Put it here");

            horizontalLayout.add(span, textField);
            horizontalLayout.getStyle().setBackground("#c3d8fa");
            return horizontalLayout;
        }));
        grid.setDetailsVisible(grid.getGenericDataView().getItem(0), true);
        grid.addSortListener(e -> Notification.show("Sorted some column"));
        grid.getStyle().setBorder("2px solid #9E9E9E");
        grid.addThemeVariants(GridVariant.LUMO_COLUMN_BORDERS, GridVariant.LUMO_ROW_STRIPES);

        TreeGrid<ProductClass> treeGrid = new TreeGrid<>(ProductClass.class);
        treeGrid.setItems(products, e -> {
                    if (e.getId() == 1 || e.getId() == 2) {
                        return List.of(
                                new ProductClass(e.getId() * 3, "a", null, new Some("Greg")),
                                new ProductClass(e.getId() * 7, "b", LocalDateTime.now(), new Some("Greg"))
                        );
                    } else {
                        return new ArrayList<ProductClass>() {
                        };
                    }
                }
        );
        treeGrid.setHierarchyColumn("name");
        treeGrid.setSelectionMode(Grid.SelectionMode.NONE);
        treeGrid.addItemDoubleClickListener(e -> Notification.show(e.getItem().getName()));
        treeGrid.addItemClickListener(e -> Notification.show(e.getItem().getCDAT().toString()));
        treeGrid.addColumn("some.info");
        treeGrid.setSortableColumns("name", "CDAT");
        treeGrid.setColumnReorderingAllowed(true);
        treeGrid.getColumnByKey("CDAT")
                .setResizable(true).setFrozen(true)
                .setRenderer(new LocalDateTimeRenderer<>(ProductClass::getCDAT, "dd-MM-YYYY HH:mm"))
                .setSortProperty("name", "CDAT")
                .addClassName("cdat-tree-column");
        treeGrid.getColumnByKey("id")
                .setRenderer(new NumberRenderer<>(ProductClass::getId,
                        NumberFormat.getCurrencyInstance(), "some"))
                .setSortOrderProvider(d ->
                        Stream.of(new QuerySortOrder("id", d.getOpposite()), new QuerySortOrder("name", d)));
        treeGrid.getColumnByKey("some.info")
                .setRenderer(LitRenderer
                        .<ProductClass>of("<b>${item.some.info}</b>")//todo Interesting
                        .withProperty("some", ProductClass::getSome));//todo only need to go to 'some' in ProductClass
        treeGrid.getColumnByKey("some")
                .setRenderer(new NativeButtonRenderer<>(e -> "Do something with " + e.getSome().getInfo(), e -> {
                    System.err.println(e.toString());
                }));
        treeGrid.addColumn(LitRenderer
                .<ProductClass>of("${item.minus100}")
                .withProperty("minus100", e -> 100 - e.getId()))
                .setHeader("Minus10o");
        treeGrid.setMultiSort(true);
        treeGrid.addThemeName("row-stripes");

        add(grid, treeGrid);
    }
}
