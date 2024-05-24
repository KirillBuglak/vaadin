package spring.vaadin.data;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class Person {
    private String name;
    private LocalDate dob;
    private String gender;
//    @NotNull(message = "Can't be null") //todo Can use annotations for validation instead of writing vaadin validators
    private boolean adult;
}
