package spring.vaadin.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller()
public class MyController {

    @RequestMapping("/simplePage")
    public String getPage() {
        return "simplePage.html";
    }
}
