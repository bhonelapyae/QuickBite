package com.quickbite.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quickbite.dto.CartItemDTO;
import com.quickbite.dto.CreateOrderRequest;
import com.quickbite.dto.OrderDTO;
import com.quickbite.dto.OrderItemDTO;
import com.quickbite.model.MenuItem;
import com.quickbite.model.Order;
import com.quickbite.model.OrderItem;
import com.quickbite.repository.MenuItemRepository;
import com.quickbite.repository.OrderRepository;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private MenuItemRepository menuItemRepository;
    
    public OrderDTO createOrder(CreateOrderRequest request) {
        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setCustomerEmail(request.getCustomerEmail());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setDeliveryType(request.getDeliveryType());
        
        BigDecimal totalPrice = BigDecimal.ZERO;
        List<OrderItem> orderItems = new java.util.ArrayList<>();
        
        for (CartItemDTO cartItem : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(cartItem.getMenuItemId())
                .orElseThrow(() -> new RuntimeException("Menu item not found: " + cartItem.getMenuItemId()));
            
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(menuItem.getPrice());
            
            totalPrice = totalPrice.add(menuItem.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
            orderItems.add(orderItem);
        }
        
        order.setItems(orderItems);
        order.setTotalPrice(totalPrice);
        
        Order saved = orderRepository.save(order);
        return convertToDTO(saved);
    }
    
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        return convertToDTO(order);
    }
    
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc()
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<OrderDTO> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public OrderDTO updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        Order saved = orderRepository.save(order);
        return convertToDTO(saved);
    }
    
    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setCustomerName(order.getCustomerName());
        dto.setCustomerEmail(order.getCustomerEmail());
        dto.setCustomerPhone(order.getCustomerPhone());
        dto.setDeliveryAddress(order.getDeliveryAddress());
        dto.setDeliveryType(order.getDeliveryType());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setStatus(order.getStatus());
        dto.setCreatedAt(order.getCreatedAt());
        
        if (order.getItems() != null) {
            dto.setItems(order.getItems().stream().map(item -> 
                new OrderItemDTO(
                    item.getMenuItem().getId(),
                    item.getMenuItem().getName(),
                    item.getQuantity(),
                    item.getPrice()
                )
            ).collect(Collectors.toList()));
        }
        
        return dto;
    }
}
