package spring.vaadin.services;

import com.vaadin.flow.spring.annotation.VaadinSessionScope;
import org.springframework.stereotype.Component;

import java.util.UUID;

@VaadinSessionScope
@Component
public class SessionService {
    private String id = UUID.randomUUID().toString();

    public String getId() {
        return id;
    }
}
