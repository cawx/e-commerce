package com.example.ecommerce.controller;

import com.example.ecommerce.DTO.AddCartItemDTO;
import com.example.ecommerce.DTO.CartItemDTO;
import com.example.ecommerce.entity.Cart;
import com.example.ecommerce.services.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/cart/{userId}")
    public ResponseEntity<List<CartItemDTO>> getCartItems(@PathVariable Long userId) {
        List<CartItemDTO> cartItemList = cartService.getCartItems(userId);
        return ResponseEntity.ok(cartItemList);
    }

    @PostMapping("/cart/add")
    public ResponseEntity<Cart> addToCart(@RequestBody AddCartItemDTO cartItemDTO) {
        Cart cart = cartService.addItemToCart(cartItemDTO.getUserId(), cartItemDTO.getProductId(), cartItemDTO.getQuantity());
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/cart/remove")
    public ResponseEntity<Void> removeItemFromCart(@RequestParam Long userId, @RequestParam Long productId) {
        cartService.removeCartItem(userId, productId);
        return ResponseEntity.noContent().build();
    }
}
