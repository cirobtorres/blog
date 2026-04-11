package com.cirobtorres.blog.api.article.services;

import com.cirobtorres.blog.api.article.dtos.ArticleCreateDTO;
import com.cirobtorres.blog.api.article.dtos.ArticleDTO;
import com.cirobtorres.blog.api.article.dtos.ArticlesDTO;
import com.cirobtorres.blog.api.article.dtos.CreateArticlesDTO;
import com.cirobtorres.blog.api.article.entities.Articles;
import com.cirobtorres.blog.api.article.enums.ArticlesStatus;
import com.cirobtorres.blog.api.article.repositories.ArticlesRepository;
import com.cirobtorres.blog.api.author.entities.Author;
import com.cirobtorres.blog.api.author.repositories.AuthorRepository;
import com.cirobtorres.blog.api.exceptions.ResourceNotFoundException;
import com.cirobtorres.blog.api.media.entities.Media;
import com.cirobtorres.blog.api.media.repositories.MediaRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class ArticlesService {
    private final ArticlesRepository articlesRepository;
    private final AuthorRepository authorRepository;
    private final MediaRepository mediaRepository;

    public ArticlesService(
            ArticlesRepository articlesRepository,
            AuthorRepository authorRepository,
            MediaRepository mediaRepository
    ) {
        this.articlesRepository = articlesRepository;
        this.authorRepository = authorRepository;
        this.mediaRepository = mediaRepository;
    }

    @Transactional
    public ArticleCreateDTO createArticle(CreateArticlesDTO dto) {
        Author author = authorRepository
                .findByUserId(dto.userId())
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "Author not found for user_id=" + dto.userId()
                        )
                );

        Media bannerMedia = mediaRepository
                .findById(dto.banner())
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "Media banner not found with id: " + dto.banner()
                        )
                );

        Articles article = new Articles.Builder()
                .author(author)
                .title(dto.title())
                .slug(dto.slug())
                .subtitle(dto.subtitle())
                .media(bannerMedia)
                .body(dto.body())
                .status(ArticlesStatus.PUBLISHED)
                .publishedAt(LocalDateTime.now())
                .build();

        Articles createdArticle = articlesRepository.save(article);

        return new ArticleCreateDTO(createdArticle);
    }

    @Transactional
    public ArticleDTO findByUrlMetadata(int year, int month, int day, String slug) {
        // QUERY
        Articles article = articlesRepository
                .findBySlug(slug)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Article not found")
                );

        // VALIDATION
        if (article.getStatus() != ArticlesStatus.PUBLISHED) {
            throw new ResourceNotFoundException("Article status not published");
        }

        LocalDateTime pub = article.getPublishedAt();

        if (
                pub == null ||
                        pub.getYear() != year ||
                        pub.getMonthValue() != month ||
                        pub.getDayOfMonth() != day
        ) {
            throw new ResourceNotFoundException("Invalid URL for article");
        }

        return new ArticleDTO(article);
    }

    @Transactional
    public Page<ArticlesDTO> listPublishedPaged(String q, Map<String, String> allParams, Pageable pageable) {
        Specification<Articles> spec =
                (root, query, cb) ->
                        cb.equal(root.get("status"), ArticlesStatus.PUBLISHED);

        // SEARCH TITLE OR SUBTITLE
        if (q != null && !q.isBlank()) {
            spec = spec.and((root, query, cb) -> {
                String searchLabel = "%" + q.toLowerCase() + "%";
                return cb.or(
                        cb.like(cb.lower(root.get("title")), searchLabel),
                        cb.like(cb.lower(root.get("subtitle")), searchLabel)
                );
            });
        }

        // DYNAMIC FILTERS (createdAt, updatedAt, likeCount, commentCount)
        List<String> filterableFields = List.of("createdAt", "updatedAt", "likeCount", "commentCount");
        for (String field : filterableFields) {
            String val = allParams.get(field);
            if (val != null && !val.isBlank()) {
                spec = spec.and((root, query, cb) -> cb.equal(root.get(field), val));
            }
        }

        /* PSEUDOCODE CATEGORY:
           if (allParams.containsKey("category")) {
               spec = spec.and((root, query, cb) ->
                   cb.equal(root.join("categories").get("slug"), allParams.get("category")));
           }
        */

        return articlesRepository.findAll(spec, pageable).map(ArticlesDTO::new);
    }
}
