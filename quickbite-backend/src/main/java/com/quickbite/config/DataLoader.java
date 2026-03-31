package com.quickbite.config;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.quickbite.model.Category;
import com.quickbite.model.MenuItem;
import com.quickbite.repository.CategoryRepository;
import com.quickbite.repository.MenuItemRepository;

import jakarta.annotation.PostConstruct;

@Component
public class DataLoader {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @PostConstruct
    public void init() {

        if (!categoryRepository.existsByName("Burger")) {

            Category burger = categoryRepository.save(
                new Category(null, "Burger", "Delicious burgers")
            );

            Category pizza = categoryRepository.save(
                new Category(null, "Pizza", "Fresh pizzas")
            );

            Category drinks = categoryRepository.save(
                new Category(null, "Drinks", "Refreshing beverages")
            );

            Category desserts = categoryRepository.save(
                new Category(null, "Desserts", "Sweet treats")
            );

            if (!menuItemRepository.existsByName("Classic Burger")) {

                menuItemRepository.save(new MenuItem(null, "Classic Burger",
                        "Juicy beef patty with lettuce and tomato",
                        BigDecimal.valueOf(8.99), null, true, burger));

                menuItemRepository.save(new MenuItem(null, "Cheese Burger",
                        "Beef patty with melted cheese",
                        BigDecimal.valueOf(9.99), null, true, burger));

                menuItemRepository.save(new MenuItem(null, "Pepperoni Pizza",
                        "Classic pepperoni pizza",
                        BigDecimal.valueOf(12.99), null, true, pizza));

                menuItemRepository.save(new MenuItem(null, "Margherita Pizza",
                        "Fresh mozzarella and basil",
                        BigDecimal.valueOf(11.99), null, true, pizza));

                menuItemRepository.save(new MenuItem(null, "Coke",
                        "330ml Coca Cola",
                        BigDecimal.valueOf(2.99), null, true, drinks));

                menuItemRepository.save(new MenuItem(null, "Iced Tea",
                        "Refreshing iced tea",
                        BigDecimal.valueOf(2.49), null, true, drinks));

                menuItemRepository.save(new MenuItem(null, "Chocolate Cake",
                        "Rich chocolate cake",
                        BigDecimal.valueOf(4.99), null, true, desserts));

                menuItemRepository.save(new MenuItem(null, "Vanilla Ice Cream",
                        "Creamy vanilla ice cream",
                        BigDecimal.valueOf(3.99), null, true, desserts));

                menuItemRepository.save(new MenuItem(null, "Water",
                        "Pure water",
                        BigDecimal.valueOf(4.00), null, true, drinks));
            }

            System.out.println("✅ Sample data loaded successfully!");
        } else {
            System.out.println("📌 Data already exists. Skipping initialization.");
        }
    }
}
