package com.ecommerce.backend.service;

import com.ecommerce.backend.repository.OrdersRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AnalyticsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    public Map<String, Object> getDashboardStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put(
                "totalUsers",
                userRepository.count()
        );

        stats.put(
                "totalProducts",
                productRepository.count()
        );

        stats.put(
                "totalOrders",
                ordersRepository.count()
        );

        return stats;
    }
}