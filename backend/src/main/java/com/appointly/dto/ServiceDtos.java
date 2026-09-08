package com.appointly.dto;

import jakarta.validation.constraints.*;

public final class ServiceDtos {
    private ServiceDtos() {}

    public record CreateServiceRequest(
        @NotBlank @Size(max = 100) String name,
        @NotBlank @Size(max = 500) String description,
        @NotNull @Min(15) Integer durationMinutes,
        @NotNull @PositiveOrZero Double price
    ) {}
}
