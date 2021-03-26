package com.github.photoscript.domains.image;

import java.util.List;

public interface ImageService {
  List<Image> getAllImages();

  Image getImageById(Long id);

  List<Image> getAllImagesByUserId(Long id);

  Image uploadImage(Image image);

  Image editImage(Long id, Image image);

  void deleteImage(Long id);
}
