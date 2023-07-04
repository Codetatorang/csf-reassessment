package ibe202.tfip.csf.reassessment.models;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class BookDetails {
    private String bookId;
    private String title;
    private String authors;
    private String description;
    private String edition;
    private String format;
    private int pages;
    private Float rating;
    private int ratingCount;
    private int reviewCount;
    private String genres;
    private String imageUrl;
}
