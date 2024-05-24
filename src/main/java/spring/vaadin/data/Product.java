package spring.vaadin.data;

import lombok.Getter;

import java.time.LocalDateTime;

public record Product(int id, String name, LocalDateTime CDAT) {}
