package com.github.photoscript.domains.image;

import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/images")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {
  private final Logger logger = LoggerFactory.getLogger(ImageController.class);

  @Autowired
  private ImageService imageService;

  @GetMapping
  public ResponseEntity<List<Image>> getAllImages() {
    logger.info("Get all images request received");
    return new ResponseEntity<>(imageService.getAllImages(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Image> getImageById(@PathVariable Long id) {
    logger.info("Get image by id request received");
    return new ResponseEntity<>(imageService.getImageById(id), HttpStatus.OK);
  }

  @GetMapping("/userId/{id}")
  public ResponseEntity<List<Image>> getAllImagesByUserId(@PathVariable Long id) {
    logger.info("Get all images by user id received");
    return new ResponseEntity<>(imageService.getAllImagesByUserId(id), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<Image> uploadNewImage(@Valid @RequestBody Image image) {
    logger.info("Post new image request received");
    return new ResponseEntity<>(imageService.uploadImage(image), HttpStatus.CREATED);
  }

  @PutMapping("/edit/{id}")
  public ResponseEntity<Image> editImage(@Valid @RequestBody Image image, @PathVariable Long id) {
    logger.info("Edit image request received");
    return new ResponseEntity<>(imageService.editImage(id, image), HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Image> deleteImage(@PathVariable Long id) {
    logger.info("Delete image request received");
    imageService.deleteImage(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
