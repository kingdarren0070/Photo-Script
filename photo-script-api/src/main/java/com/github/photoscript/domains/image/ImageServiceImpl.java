package com.github.photoscript.domains.image;

import com.github.photoscript.exceptions.ResourceNotFound;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
public class ImageServiceImpl implements ImageService{
  private final Logger logger = LoggerFactory.getLogger(ImageServiceImpl.class);

  @Autowired
  private ImageRepository imageRepository;

  @Override
  public List<Image> getAllImages() {
    List<Image> imageList = new ArrayList<>();

    try {
      imageList = imageRepository.findAll();
    } catch (DataAccessException e) {
      logger.error(e.getMessage());
    }

    return imageList;
  }

  @Override
  public Image getImageById(Long id) {
    Optional<Image> image = Optional.ofNullable(null);

    try {
      image = imageRepository.findById(id);
    } catch (DataAccessException e) {
      logger.error(e.getMessage());
    }

    if(image.isEmpty()) {
      throw new ResourceNotFound();
    } else {
      return image.get();
    }
  }

  @Transactional
  @Override
  public List<Image> getAllImagesByUserId(Long id) {
    List<Image> imageList = imageRepository.findAllByUserId(id);
    return imageList;
  }

  @Override
  public Image uploadImage(Image image) {
    Image postedImage = null;

    try {
      postedImage = imageRepository.save(image);
    } catch (DataAccessException e) {
      logger.error(e.getMessage());
    }

    return postedImage;
  }

  @Override
  public Image editImage(Long id, Image image) {
    Image editedImage = null;

    try {
      Optional<Image> imageToUpdate = imageRepository.findById(id);
      if(imageToUpdate.isEmpty()) {
        throw new ResourceNotFound();
      } else {
        editedImage = imageRepository.save(image);
      }
    } catch (DataAccessException e) {
      logger.error(e.getMessage());
    }

    return editedImage;
  }

  @Override
  public void deleteImage(Long id) {
    try {
      imageRepository.deleteById(id);
    } catch (DataAccessException e) {
      logger.error(e.getMessage());
    }
  }
}
