package com.appointly.repository;

import com.appointly.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUserEmailOrderByAppointmentDateDescAppointmentTimeDesc(String email);
    boolean existsByServiceIdAndAppointmentDateAndAppointmentTimeAndStatus(
        Long serviceId, LocalDate date, LocalTime time, AppointmentStatus status
    );
}
