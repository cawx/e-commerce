package com.example.ecommerce.repository;

import com.example.ecommerce.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query("DELETE FROM CartItem ci WHERE ci.cart.user.id = :userId AND ci.productId = :productId")
    void deleteByUserIdAndProductId(Long userId, Long productId);
}
