package com.example.ecommerce.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class S3Service {
    @Autowired
    private AmazonS3 amazonS3;

    //@Value("${aws.s3.bucketName}")
    private String bucketName = "ecommercesprng";

    private static final List<String> SUPPORTED_EXTENSIONS = Arrays.asList(
            ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff"
    );

    public String uploadImg(MultipartFile file) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("file missing");
        }

        if (!isSupportedFileType(file.getOriginalFilename())) {
            throw new IllegalArgumentException("Unsupported file type");
        }

        String uniqueFilename = generateUniqueFilename(file.getOriginalFilename());

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        try(var inputStream = file.getInputStream()) {
            amazonS3.putObject(bucketName,uniqueFilename,inputStream,metadata);
        }

        return amazonS3.getUrl(bucketName, uniqueFilename).toString();
    }

    private boolean isSupportedFileType(String filename) {
        if (filename == null || !filename.contains(".")) {
            return false;
        }
        String extension = filename.substring(filename.lastIndexOf(".")).toLowerCase();
        return SUPPORTED_EXTENSIONS.contains(extension);
    }

    private String generateUniqueFilename(String originalFilename) {
        if (originalFilename == null || !originalFilename.contains(".")) {
            return UUID.randomUUID().toString();
        }
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        return UUID.randomUUID().toString() + extension;
    }

}
