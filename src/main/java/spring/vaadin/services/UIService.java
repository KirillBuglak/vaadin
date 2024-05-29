package spring.vaadin.services;

import com.vaadin.flow.spring.annotation.UIScope;
import org.springframework.stereotype.Component;

import java.util.UUID;

@UIScope
@Component
public class UIService {
    private String id = UUID.randomUUID().toString();

    public String getId() {
        return id;
    }
}
