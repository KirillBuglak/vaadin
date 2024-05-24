package spring.vaadin.data;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ProductClass {
    private int id;
    private String name;
    private LocalDateTime CDAT;
    private Some some;
}
