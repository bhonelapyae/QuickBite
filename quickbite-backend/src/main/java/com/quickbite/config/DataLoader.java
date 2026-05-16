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

                MenuItem classicBurger = new MenuItem();
                classicBurger.setName("Classic Burger");
                classicBurger.setDescription("Juicy beef patty with lettuce and tomato");
                classicBurger.setPrice(BigDecimal.valueOf(8.99));
                classicBurger.setImageUrl(null);
                classicBurger.setAvailable(true);
                classicBurger.setCategory(burger);
                classicBurger.setIngredients("Beef patty, Lettuce, Tomato, Bun, Cheese, Sauce");
                menuItemRepository.save(classicBurger);

                MenuItem cheeseBurger = new MenuItem();
                cheeseBurger.setName("Cheese Burger");
                cheeseBurger.setDescription("Beef patty with melted cheese");
                cheeseBurger.setPrice(BigDecimal.valueOf(9.99));
                cheeseBurger.setImageUrl(null);
                cheeseBurger.setAvailable(true);
                cheeseBurger.setCategory(burger);
                cheeseBurger.setIngredients("Beef patty, Cheese, Lettuce, Tomato, Bun, Sauce");
                menuItemRepository.save(cheeseBurger);

                MenuItem pepperoniPizza = new MenuItem();
                pepperoniPizza.setName("Pepperoni Pizza");
                pepperoniPizza.setDescription("Classic pepperoni pizza");
                pepperoniPizza.setPrice(BigDecimal.valueOf(12.99));
                pepperoniPizza.setImageUrl(null);
                pepperoniPizza.setAvailable(true);
                pepperoniPizza.setCategory(pizza);
                pepperoniPizza.setIngredients("Dough, Tomato sauce, Mozzarella, Pepperoni");
                menuItemRepository.save(pepperoniPizza);

                MenuItem margheritaPizza = new MenuItem();
                margheritaPizza.setName("Margherita Pizza");
                margheritaPizza.setDescription("Fresh mozzarella and basil");
                margheritaPizza.setPrice(BigDecimal.valueOf(11.99));
                margheritaPizza.setImageUrl(null);
                margheritaPizza.setAvailable(true);
                margheritaPizza.setCategory(pizza);
                margheritaPizza.setIngredients("Dough, Tomato sauce, Mozzarella, Basil, Olive oil");
                menuItemRepository.save(margheritaPizza);

                MenuItem coke = new MenuItem();
                coke.setName("Coke");
                coke.setDescription("330ml Coca Cola");
                coke.setPrice(BigDecimal.valueOf(2.99));
                coke.setImageUrl(null);
                coke.setAvailable(true);
                coke.setCategory(drinks);
                coke.setIngredients("Carbonated water, Sugar, Caramel color, Phosphoric acid, Caffeine");
                menuItemRepository.save(coke);

                MenuItem icedTea = new MenuItem();
                icedTea.setName("Iced Tea");
                icedTea.setDescription("Refreshing iced tea");
                icedTea.setPrice(BigDecimal.valueOf(2.49));
                icedTea.setImageUrl(null);
                icedTea.setAvailable(true);
                icedTea.setCategory(drinks);
                icedTea.setIngredients("Black tea, Water, Sugar, Lemon");
                menuItemRepository.save(icedTea);

                MenuItem chocolateCake = new MenuItem();
                chocolateCake.setName("Chocolate Cake");
                chocolateCake.setDescription("Rich chocolate cake");
                chocolateCake.setPrice(BigDecimal.valueOf(4.99));
                chocolateCake.setImageUrl(null);
                chocolateCake.setAvailable(true);
                chocolateCake.setCategory(desserts);
                chocolateCake.setIngredients("Flour, Cocoa powder, Sugar, Eggs, Butter, Milk");
                menuItemRepository.save(chocolateCake);

                MenuItem vanillaIceCream = new MenuItem();
                vanillaIceCream.setName("Vanilla Ice Cream");
                vanillaIceCream.setDescription("Creamy vanilla ice cream");
                vanillaIceCream.setPrice(BigDecimal.valueOf(3.99));
                vanillaIceCream.setImageUrl(null);
                vanillaIceCream.setAvailable(true);
                vanillaIceCream.setCategory(desserts);
                vanillaIceCream.setIngredients("Milk, Cream, Sugar, Vanilla extract");
                menuItemRepository.save(vanillaIceCream);

                MenuItem water = new MenuItem();
                water.setName("Water");
                water.setDescription("Pure water");
                water.setPrice(BigDecimal.valueOf(4.00));
                water.setImageUrl(null);
                water.setAvailable(true);
                water.setCategory(drinks);
                water.setIngredients("Water");
                menuItemRepository.save(water);
            }
            System.out.println("✅ Sample data loaded successfully!");
        } else {
            System.out.println("📌 Data already exists. Skipping initialization.");
        }

        if (!categoryRepository.existsByName("🍟 Sides")) {
            categoryRepository.save(
                new Category(null, "🍟 Sides", "Tasty side dishes")
            );
        }

        if (!categoryRepository.existsByName("🌯 Wraps / Sandwiches")) {
            categoryRepository.save(
                new Category(null, "🌯 Wraps / Sandwiches", "Wraps and sandwiches")
            );
        }
    }
}
