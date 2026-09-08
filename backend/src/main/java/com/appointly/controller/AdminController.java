package com.appointly.controller;

import com.appointly.dto.ServiceDtos.CreateServiceRequest;
import com.appointly.model.*;
import com.appointly.repository.*;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final ServiceItemRepository services;
    private final AppointmentRepository appointments;

    public AdminController(ServiceItemRepository services, AppointmentRepository appointments) {
        this.services = services;
        this.appointments = appointments;
    }

    @PostMapping("/services")
    public ResponseEntity<ServiceItem> createService(@Valid @RequestBody CreateServiceRequest req) {
        ServiceItem s = new ServiceItem();
        s.setName(req.name());
        s.setDescription(req.description());
        s.setDurationMinutes(req.durationMinutes());
        s.setPrice(req.price());
        return ResponseEntity.status(HttpStatus.CREATED).body(services.save(s));
    }

    @GetMapping("/appointments")
    public List<Appointment> appointments() {
        return appointments.findAll();
    }
}
