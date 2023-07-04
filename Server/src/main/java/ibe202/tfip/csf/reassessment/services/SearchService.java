package ibe202.tfip.csf.reassessment.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibe202.tfip.csf.reassessment.models.BookDetails;
import ibe202.tfip.csf.reassessment.repositories.SearchRepository;

@Service
public class SearchService {
    @Autowired
    private SearchRepository searchRepository;

    public Optional<List<BookDetails>> searchByStartingChar(String letter) {
        return searchRepository.searchByStartingChar(letter);
    }

    public Optional<BookDetails> getBookbyTitle(String title) {
        return searchRepository.getBookbyTitle(title);
    }
}
