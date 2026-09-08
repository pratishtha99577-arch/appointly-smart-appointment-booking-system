package com.appointly.controller;

import com.appointly.dto.AppointmentDtos.*;
import com.appointly.model.*;
import com.appointly.repository.*;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    private final AppointmentRepository appointments;
    private final UserRepository users;
    private final ServiceItemRepository services;

    public AppointmentController(
        AppointmentRepository appointments,
        UserRepository users,
        ServiceItemRepository services
    ) {
        this.appointments = appointments;
        this.users = users;
        this.services = services;
    }

    @PostMapping
    public ResponseEntity<?> book(
        @Valid @RequestBody CreateAppointmentRequest req,
        java.security.Principal principal
    ) {
        ServiceItem service = services.findById(req.serviceId())
            .orElseThrow(() -> new IllegalArgumentException("Service not found."));

        if (appointments.existsByServiceIdAndAppointmentDateAndAppointmentTimeAndStatus(
            service.getId(), req.appointmentDate(), req.appointmentTime(), AppointmentStatus.BOOKED)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("That time slot is already booked."));
        }

        User user = users.findByEmail(principal.getName())
            .orElseThrow(() -> new IllegalArgumentException("User not found."));

        Appointment a = new Appointment();
        a.setUser(user);
        a.setService(service);
        a.setAppointmentDate(req.appointmentDate());
        a.setAppointmentTime(req.appointmentTime());

        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(appointments.save(a)));
    }

    @GetMapping("/my")
    public List<AppointmentResponse> mine(java.security.Principal principal) {
        return appointments.findByUserEmailOrderByAppointmentDateDescAppointmentTimeDesc(principal.getName())
            .stream().map(this::toResponse).toList();
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Long id, java.security.Principal principal) {
        Appointment a = appointments.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Appointment not found."));

        if (!a.getUser().getEmail().equals(principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ErrorResponse("You can only cancel your own appointments."));
        }

        a.setStatus(AppointmentStatus.CANCELLED);
        return ResponseEntity.ok(toResponse(appointments.save(a)));
    }

    private AppointmentResponse toResponse(Appointment a) {
        return new AppointmentResponse(
            a.getId(), a.getService().getName(), a.getService().getDurationMinutes(),
            a.getService().getPrice(), a.getAppointmentDate(), a.getAppointmentTime(),
            a.getStatus().name()
        );
    }

    public record ErrorResponse(String message) {}
}
