package com.quickbite.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
    private Long menuItemId;
    private String menuItemName;
    private Integer quantity;
    private BigDecimal price;
}
