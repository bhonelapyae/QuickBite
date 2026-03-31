package com.quickbite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quickbite.dto.MenuItemDTO;
import com.quickbite.service.MenuItemService;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuController {
    
    @Autowired
    private MenuItemService menuItemService;
    
    @GetMapping
    public ResponseEntity<List<MenuItemDTO>> getMenuItems(
        @RequestParam(required = false) Long category
    ) {
        if (category != null) {
            return ResponseEntity.ok(menuItemService.getMenuItemsByCategory(category));
        }
        return ResponseEntity.ok(menuItemService.getAllMenuItems());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MenuItemDTO> getMenuItemById(@PathVariable Long id) {
        return ResponseEntity.ok(menuItemService.getMenuItemById(id));
    }
    
    @PostMapping
    public ResponseEntity<MenuItemDTO> createMenuItem(@RequestBody MenuItemDTO menuItemDTO) {
        return ResponseEntity.ok(menuItemService.createMenuItem(menuItemDTO));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<MenuItemDTO> updateMenuItem(
        @PathVariable Long id,
        @RequestBody MenuItemDTO menuItemDTO
    ) {
        return ResponseEntity.ok(menuItemService.updateMenuItem(id, menuItemDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.noContent().build();
    }
}
