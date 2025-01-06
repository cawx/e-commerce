package com.example.ecommerce.services;

import com.example.ecommerce.DTO.CartItemDTO;
import com.example.ecommerce.entity.Cart;
import com.example.ecommerce.entity.CartItem;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.repository.CartItemRepository;
import com.example.ecommerce.repository.CartRepository;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    public Cart getCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("user not found"));
        return cartRepository.findByUser(user).orElseGet(() -> createCart(user));
    }

    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    public Cart addItemToCart(Long userId, Long productId, int quantity) {
        Cart cart = getCart(userId);
        Optional<CartItem> existingItem = cart.getCartItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();
        if(existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity()+quantity);
            cartItemRepository.save(item);
        } else {
            CartItem newItem = new CartItem();
            newItem.setProductId(productId);
            newItem.setCart(cart);
            newItem.setQuantity(quantity);
            cartItemRepository.save(newItem);
        }
        return cartRepository.save(cart);
    }

    public List<CartItemDTO> getCartItems(Long userid) {
        Cart cart = getCart(userid);
        List<CartItem> cartItems = cart.getCartItems();
        return cartItems.stream().map(cartItem -> {
            Product product = productRepository.findById(cartItem.getProductId())
                    .orElseThrow(() -> new RuntimeException("product not found"));
            CartItemDTO cartItemDTO = new CartItemDTO();
            cartItemDTO.setCartItemId(cartItem.getId());
            cartItemDTO.setProductId(product.getId());
            cartItemDTO.setProductTitle(product.getTitle());
            cartItemDTO.setProductPrice(product.getPrice());
            cartItemDTO.setQuantity(cartItem.getQuantity());
            return cartItemDTO;
        }).collect(Collectors.toList());
    }

    @Transactional
    public void removeCartItem(Long userId, Long productId) {
        cartItemRepository.deleteByUserIdAndProductId(userId, productId);
    }
}
