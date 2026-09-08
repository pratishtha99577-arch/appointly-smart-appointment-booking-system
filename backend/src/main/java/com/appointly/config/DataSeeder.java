package com.appointly.config;

import com.appointly.model.*;
import com.appointly.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seed(
        UserRepository users,
        ServiceItemRepository services,
        PasswordEncoder encoder
    ) {
        return args -> {
            if (!users.existsByEmail("admin@appointly.local")) {
                User admin = new User();
                admin.setName("Appointly Admin");
                admin.setEmail("admin@appointly.local");
                admin.setPassword(encoder.encode("Admin@12345"));
                admin.setRole(Role.ADMIN);
                users.save(admin);
            }

            if (services.count() == 0) {
                create(services, "Strategy Consultation",
                    "Focused one-to-one consultation for planning your next move.",
                    45, 1200);
                create(services, "Premium Session",
                    "A deeper session with dedicated time for analysis and recommendations.",
                    60, 1800);
                create(services, "Quick Connect",
                    "A short session for focused questions and fast decisions.",
                    20, 650);
            }
        };
    }

    private void create(ServiceItemRepository repo, String name, String desc, int mins, double price) {
        ServiceItem s = new ServiceItem();
        s.setName(name);
        s.setDescription(desc);
        s.setDurationMinutes(mins);
        s.setPrice(price);
        repo.save(s);
    }
}
