package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.Orders;
import com.ecommerce.backend.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping("/place")
    public void placeOrder(@RequestParam String email) {
        ordersService.placeOrder(email);
    }

    @GetMapping("/{email}")
    public List<Orders> getOrders(@PathVariable String email) {
        return ordersService.getOrders(email);
    }

    @PutMapping("/status/{id}")
    public Orders updateOrderStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return ordersService.updateOrderStatus(id, status);
    }
    @GetMapping("/recent")
    public List<Orders> getRecentOrders() {
        return ordersService.getRecentOrders();
    }
}