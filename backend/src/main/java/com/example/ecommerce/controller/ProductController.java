package com.example.ecommerce.controller;

import com.example.ecommerce.DTO.ProductListDTO;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin
public class ProductController {
    @Autowired
    private ProductService productService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public Product addNewProduct(@RequestBody Product product) throws Exception {
        return productService.addProduct(product);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok("product deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @PostMapping("/bulk")
    public ResponseEntity<?> addProducts(@RequestBody List<Product> products) throws Exception {
        try {
            if (products.size() > 100) {
                return ResponseEntity.badRequest().body("no more than 100 products at once");
            }
            List<Product> savedProducts = productService.addProducts(products);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProducts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@RequestBody Product product, @PathVariable Long id) throws Exception {
        productService.updateProduct(product, id);
        return ResponseEntity.ok("product update success");
    }
    // pagination starts from 0 but regular users dont like starting the count from 0 thats why its 1
    @GetMapping
    public Page<ProductListDTO> getProducts(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size) {
        return productService.getAllProducts(page-1, size);
    }
    @GetMapping("/category") // change it to pageable
    public Optional<List<Product>> getProductsByCategory(@RequestParam String category) {
        return productService.getAllProductsByCategory(category);
    }
    @GetMapping("/products/search")
    public List<Product> getProductsBySearch(@RequestParam String keyword) {
        return productService.getProductsBySearch(keyword);
    }

}
