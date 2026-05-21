package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.Cart;
import com.ecommerce.backend.entity.Orders;
import com.ecommerce.backend.repository.CartRepository;
import com.ecommerce.backend.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private CartRepository cartRepository;

    public void placeOrder(String userEmail) {

        List<Cart> cartItems = cartRepository.findByUserEmail(userEmail);

        for (Cart cart : cartItems) {

            Orders order = new Orders();

            order.setUserEmail(cart.getUserEmail());
            order.setProductName(cart.getProductName());
            order.setPrice(cart.getPrice());
            order.setQuantity(cart.getQuantity());
            order.setImageUrl(cart.getImageUrl());

            order.setStatus("PLACED");

            ordersRepository.save(order);
        }

        cartRepository.deleteAll(cartItems);
    }

    public List<Orders> getOrders(String userEmail) {
        return ordersRepository.findByUserEmail(userEmail);
    }

    public Orders updateOrderStatus(Long id, String status) {

        Orders order = ordersRepository.findById(id).orElse(null);

        if (order != null) {

            order.setStatus(status);

            return ordersRepository.save(order);
        }

        return null;
    }
    public List<Orders> getRecentOrders() {
        return ordersRepository.findTop5ByOrderByIdDesc();
    }
}