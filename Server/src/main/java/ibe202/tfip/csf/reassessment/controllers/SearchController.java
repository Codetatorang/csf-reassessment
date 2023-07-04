package ibe202.tfip.csf.reassessment.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import ibe202.tfip.csf.reassessment.models.BookDetails;
import ibe202.tfip.csf.reassessment.services.SearchService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

@RestController
// @CrossOrigin("http://localhost:4200/")
@RequestMapping("/findbook")
public class SearchController {
    @Autowired
    private SearchService searchService;

    private final String NYTIMES_API = "https://api.nytimes.com/svc/books/v3/reviews.json";

    // "https://developer.nytimes.com/docs/books-product/1/routes/reviews.json/get";

    private final String API_KEY = "FTswwKD8mWru0bmj1TmdZxwkcJVqdaGJ";

    @GetMapping("/searchchar/{letter}")
    public ResponseEntity<String> searchBookByChar(@PathVariable("letter") String letter) {
        System.out.println("backend called, path variable is: " + letter);
        Optional<List<BookDetails>> resultList = searchService.searchByStartingChar(letter);

        // System.out.println("resultList: " + resultList);
        if (null == resultList) {
            JsonObject obj = Json.createObjectBuilder()
                    .add("errormsg", "no results found in database.")
                    .build();
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(obj.toString());
        }
        // sucess
        JsonArrayBuilder jsonArray = Json.createArrayBuilder();
        for (BookDetails book : resultList.get()) {
            System.out.println("book content: " + book);
            jsonArray.add(
                    Json.createObjectBuilder()
                            .add("title", book.getTitle())
            );
        }
        JsonArray array = jsonArray.build();
        System.out.println("jsonarray value: " + array);

        System.out.println("jsonarray contents to string: " + array.toString());
        return ResponseEntity.ok(array.toString());
    }

    @GetMapping("/{title}")
    public ResponseEntity<String> getBookDetails(@PathVariable("title") String title) {
        Optional<BookDetails> bookContainer = searchService.getBookbyTitle(title);
        if (bookContainer.isEmpty())
            return ResponseEntity.ok("Book: " + title + " not found.");

        BookDetails book = bookContainer.get();
        JsonObject obj = Json.createObjectBuilder()
                .add("bookId", book.getBookId())
                .add("title", book.getTitle())
                .add("authors", book.getAuthors())
                .add("description", book.getDescription())
                .add("edition", book.getEdition())
                .add("format", book.getFormat())
                .add("pages", book.getPages())
                .add("rating", book.getRating())
                .add("ratingCount", book.getRatingCount())
                .add("reviewCount", book.getReviewCount())
                .add("genres", book.getGenres())
                .add("imageUrl", book.getImageUrl())
                .build();
        return ResponseEntity.ok(obj.toString());
    }

    @GetMapping("api/{title}")
    public ResponseEntity<String> viaAPI(@PathVariable String title){
        RestTemplate restTemplate = new RestTemplate();
        String queryString = NYTIMES_API + "?title=" + title + "&api-key=" + API_KEY;
        String result = restTemplate.getForObject(queryString, String.class);

        System.out.println(result);
        
        JsonObject obj = Json.createObjectBuilder()
                .add("result", result)
                .build();
        return ResponseEntity.ok(obj.toString());
    }
}
