package com.ecommerce.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("*")
public class PaymentController {

    @PostMapping("/pay")
    public Map<String, Object> makePayment(
            @RequestParam String email,
            @RequestParam Double amount
    ) {
        Map<String, Object> response = new HashMap<>();

        response.put("message", "Payment successful");
        response.put("email", email);
        response.put("amount", amount);
        response.put("status", "SUCCESS");
        response.put("transactionId", "TXN" + System.currentTimeMillis());

        return response;
    }
}
