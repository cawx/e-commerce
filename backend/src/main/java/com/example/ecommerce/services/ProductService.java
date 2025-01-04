package com.example.ecommerce.services;

import com.example.ecommerce.DTO.ProductListDTO;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product addProduct(Product product) throws Exception {
        try {
            return productRepository.save(product);
        } catch (Exception e) {
            throw new Exception("error adding a new product.");
        }
    }

    public List<Product> addProducts(List<Product> products) throws Exception {
        List<Product> savedProducts = new ArrayList<>();
        try {
            for (Product product : products) {
                savedProducts.add(productRepository.save(product));
            }
            return savedProducts;
        } catch (Exception e) {
            throw new Exception("error adding products: " + e.getMessage());
        }
    }
    
    public void deleteProduct(Long id) throws Exception {
        if(!productRepository.existsById(id)) {
            throw new Exception("product not found with id.");
        } else {
            productRepository.deleteById(id);
        }
    }
    public void updateProduct() {
        return;
    }
    public Page<ProductListDTO> getAllProducts(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findAll(pageRequest);
        return productPage.map(product -> new ProductListDTO(
                product.getId(),
                product.getTitle(),
                product.getPrice(),
                product.getQuantity()
        ));
    }
    public Optional<List<Product>> getAllProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> getProductsBySearch(String keyword) {
        return productRepository.searchProducts(keyword);
    }
}
