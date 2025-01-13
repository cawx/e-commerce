package com.example.ecommerce.DTO;

public class ProductListDTO {
    private Long id;
    private String title;
    private Float price;
    private String brand;
    private String imageUrl;

    public ProductListDTO(Long id, String title, Float price, String brand, String imageUrl) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.brand = brand;
        this.imageUrl = imageUrl;

    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Float getPrice() {
        return price;
    }

    public String getBrand() {
        return brand;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
