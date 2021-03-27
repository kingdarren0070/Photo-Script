package com.github.photoscript.domains.image;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="image")
public class Image {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  private Long userId;

  @NotBlank
  private String imgName;

  @NotNull
  private byte[] imgData;

  public Image() {
  }

  public Image(@NotNull Long userId, @NotBlank String imgName,
      @NotBlank byte[] imgData) {
    this.userId = userId;
    this.imgName = imgName;
    this.imgData = imgData;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public String getImgName() {
    return imgName;
  }

  public void setImgName(String imgName) {
    this.imgName = imgName;
  }

  public byte[] getImgData() {
    return imgData;
  }

  public void setImgData(byte[] imgData) {
    this.imgData = imgData;
  }

  @Override
  public String toString() {
    return "Image{" +
        "id=" + id +
        ", userId=" + userId +
        ", imgName='" + imgName + '\'' +
        ", imgData='" + imgData + '\'' +
        '}';
  }
}
