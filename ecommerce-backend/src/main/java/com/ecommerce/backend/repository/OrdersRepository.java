package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {

    List<Orders> findByUserEmail(String userEmail);

    List<Orders> findTop5ByOrderByIdDesc();
}
