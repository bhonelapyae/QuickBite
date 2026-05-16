package com.quickbite.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quickbite.dto.MenuItemDTO;
import com.quickbite.model.Category;
import com.quickbite.model.MenuItem;
import com.quickbite.repository.CategoryRepository;
import com.quickbite.repository.MenuItemRepository;
import com.quickbite.repository.OrderItemRepository;

@Service
public class MenuItemService {
    
    @Autowired
    private MenuItemRepository menuItemRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    public List<MenuItemDTO> getAllMenuItems() {
        return menuItemRepository.findAll()
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<MenuItemDTO> getMenuItemsByCategory(Long categoryId) {
        return menuItemRepository.findByCategory_Id(categoryId)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public MenuItemDTO getMenuItemById(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Menu item not found"));
        return convertToDTO(menuItem);
    }
    
    public MenuItemDTO createMenuItem(MenuItemDTO menuItemDTO) {
        MenuItem menuItem = new MenuItem();
        menuItem.setName(menuItemDTO.getName());
        menuItem.setDescription(menuItemDTO.getDescription());
        menuItem.setPrice(menuItemDTO.getPrice());
        menuItem.setImageUrl(menuItemDTO.getImageUrl());
        menuItem.setAvailable(menuItemDTO.getAvailable() != null ? menuItemDTO.getAvailable() : true);
        menuItem.setIngredients(menuItemDTO.getIngredients());
        
        if (menuItemDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(menuItemDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
            menuItem.setCategory(category);
        }
        
        MenuItem saved = menuItemRepository.save(menuItem);
        return convertToDTO(saved);
    }
    
    public MenuItemDTO updateMenuItem(Long id, MenuItemDTO menuItemDTO) {
        MenuItem menuItem = menuItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Menu item not found"));
        
        menuItem.setName(menuItemDTO.getName());
        menuItem.setDescription(menuItemDTO.getDescription());
        menuItem.setPrice(menuItemDTO.getPrice());
        menuItem.setImageUrl(menuItemDTO.getImageUrl());
        menuItem.setAvailable(menuItemDTO.getAvailable());
        menuItem.setIngredients(menuItemDTO.getIngredients());
        
        if (menuItemDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(menuItemDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
            menuItem.setCategory(category);
        }
        
        MenuItem saved = menuItemRepository.save(menuItem);
        return convertToDTO(saved);
    }
    
    public void deleteMenuItem(Long id) {
        if (orderItemRepository.existsByMenuItem_Id(id)) {
            throw new RuntimeException("Cannot delete item that is part of an active order");
        }
        menuItemRepository.deleteById(id);
    }
    
    private MenuItemDTO convertToDTO(MenuItem menuItem) {
        MenuItemDTO dto = new MenuItemDTO();
        dto.setId(menuItem.getId());
        dto.setName(menuItem.getName());
        dto.setDescription(menuItem.getDescription());
        dto.setPrice(menuItem.getPrice());
        dto.setImageUrl(menuItem.getImageUrl());
        dto.setAvailable(menuItem.getAvailable());
        if (menuItem.getCategory() != null) {
            dto.setCategoryId(menuItem.getCategory().getId());
            dto.setCategoryName(menuItem.getCategory().getName());
        }
        dto.setIngredients(menuItem.getIngredients());
        return dto;
    }
}
