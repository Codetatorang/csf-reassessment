package ibe202.tfip.csf.reassessment.repositories;

// import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
// import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import ibe202.tfip.csf.reassessment.models.BookDetails;

@Repository
public class SearchRepository {
    private static final String SEARCHBY_CHAR = "select * from book2018 WHERE title like ?";
    private static final String SEARCHBY_TITLE = "select * from book2018 WHERE title = ?";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Optional<List<BookDetails>> searchByStartingChar(String letter) {
        // final SqlRowSet rs = jdbcTemplate.queryForRowSet(SEARCHBY_CHAR, letter);
        // List<BookDetails> resultList = new ArrayList<BookDetails>();

        // if (null == rs) {
        // return Optional.empty();
        // }

        // while (rs.next()) {
        // BookDetails book = new BookDetails();
        // book.setBookId(rs.getString("book_id"));
        // book.setTitle(rs.getString("title"));
        // book.setAuthors(rs.getString("authors"));
        // book.setDescription(rs.getString("description"));
        // book.setEdition(rs.getString("edition"));
        // book.setFormat(rs.getString("format"));
        // book.setPages(rs.getInt("pages"));
        // book.setRating(rs.getFloat("rating"));
        // book.setRatingCount(rs.getInt("ratingCount"));
        // book.setReviewCount(rs.getInt("reviewCount"));
        // book.setGenres(rs.getString("genres"));
        // book.setImageUrl(rs.getString("imageUrl"));

        // resultList.add(book);
        // }
        String wildcardAppend = letter + "%";
        List<BookDetails> resultList = jdbcTemplate.query(SEARCHBY_CHAR,
                BeanPropertyRowMapper.newInstance(BookDetails.class), wildcardAppend);
        if (resultList.isEmpty())
            return Optional.empty();
        return Optional.of(resultList);

    }

    public Optional<BookDetails> getBookbyTitle(String title) {
        // BookDetails book = jdbcTemplate.queryForObject(SEARCHBY_TITLE,
        // BookDetails.class, title);
        BookDetails book = jdbcTemplate.queryForObject(SEARCHBY_TITLE,
                BeanPropertyRowMapper.newInstance(BookDetails.class), title);

        if (null == book)
            return Optional.empty();
        return Optional.of(book);
    }
}
