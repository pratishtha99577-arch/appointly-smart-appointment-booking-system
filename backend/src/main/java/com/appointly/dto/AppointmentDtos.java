package com.appointly.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public final class AppointmentDtos {
    private AppointmentDtos() {}

    public record CreateAppointmentRequest(
        @NotNull Long serviceId,
        @NotNull @FutureOrPresent LocalDate appointmentDate,
        @NotNull LocalTime appointmentTime
    ) {}

    public record AppointmentResponse(
        Long id, String service, Integer durationMinutes, Double price,
        LocalDate appointmentDate, LocalTime appointmentTime, String status
    ) {}
}
