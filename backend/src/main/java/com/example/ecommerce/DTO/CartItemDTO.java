package com.example.ecommerce.DTO;

public class CartItemDTO {
    private Long cartItemId;
    private Long productId;
    private String productTitle;
    private Float productPrice;
    private int quantity;

    public Long getCartItemId() {
        return cartItemId;
    }

    public Long getProductId() {
        return productId;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public Float getProductPrice() {
        return productPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setCartItemId(Long cartItemId) {
        this.cartItemId = cartItemId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    public void setProductPrice(Float productPrice) {
        this.productPrice = productPrice;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
