package com.appointly.controller;

import com.appointly.dto.ServiceDtos.CreateServiceRequest;
import com.appointly.model.ServiceItem;
import com.appointly.repository.ServiceItemRepository;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {
    private final ServiceItemRepository repository;

    public ServiceController(ServiceItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ServiceItem> all() {
        return repository.findAll();
    }
}
