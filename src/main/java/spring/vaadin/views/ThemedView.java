package spring.vaadin.views;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.theme.material.Material;

@Route("themed")
public class ThemedView extends VerticalLayout {

    public ThemedView() {
        TextField normalText = new TextField("normal", "normal");
        TextField themedText = new TextField("themed", "themed");
        themedText.setThemeName(Material.DARK);
        TextField anotherThemed = new TextField("anotherThemed", "anotherThemed");
        anotherThemed.addThemeVariants(TextFieldVariant.MATERIAL_ALWAYS_FLOAT_LABEL, TextFieldVariant.LUMO_ALIGN_RIGHT);

        add(normalText, themedText, anotherThemed);
    }
}
