package com.cirobtorres.blog.api.article.services;

import com.cirobtorres.blog.api.article.dtos.*;
import com.cirobtorres.blog.api.article.entities.Articles;
import com.cirobtorres.blog.api.article.entities.Revisions;
import com.cirobtorres.blog.api.article.enums.ArticlesStatus;
import com.cirobtorres.blog.api.article.repositories.ArticlesRepository;
import com.cirobtorres.blog.api.article.repositories.RevisionsRepository;
import com.cirobtorres.blog.api.author.entities.Author;
import com.cirobtorres.blog.api.author.repositories.AuthorRepository;
import com.cirobtorres.blog.api.exceptions.ResourceNotFoundException;
import com.cirobtorres.blog.api.media.entities.Media;
import com.cirobtorres.blog.api.media.repositories.MediaRepository;
import com.cirobtorres.blog.api.tag.entities.Tag;
import com.cirobtorres.blog.api.tag.repositories.TagRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Join;
import jakarta.transaction.Transactional;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class ArticlesService {
    private final ArticlesRepository articlesRepository;
    private final RevisionsRepository revisionsRepository;
    private final AuthorRepository authorRepository;
    private final MediaRepository mediaRepository;
    private final TagRepository tagsRepository;

    public ArticlesService(
            ArticlesRepository articlesRepository,
            RevisionsRepository revisionsRepository,
            AuthorRepository authorRepository,
            MediaRepository mediaRepository,
            TagRepository tagsRepository
    ) {
        this.articlesRepository = articlesRepository;
        this.revisionsRepository = revisionsRepository;
        this.authorRepository = authorRepository;
        this.mediaRepository = mediaRepository;
        this.tagsRepository = tagsRepository;
    }

    @Transactional
    public ArticleDTO findBySlug(@NonNull ArticleSlugDTO slugDTO) {
        String slug = slugDTO.slug();

        Articles article = articlesRepository
                .findBySlug(slug)
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "Article not found for slug=" + slug
                        )
                );

        return new ArticleDTO(article);
    }

    @Transactional
    public ArticleDTO createArticle(@NonNull ArticleSaveDTO dto) {
        Author author = authorRepository
                .findByUserId(dto.userId())
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "Author not found for user_id=" + dto.userId()
                        )
                );

        Set<Tag> tags = tagsRepository
                .findAllByIdIn(dto.tags())
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "tags: " + dto.tags() + " not found"
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
                .slug(dto.slug())
                .status(ArticlesStatus.DRAFT)
                .publishedAt(LocalDateTime.now())
                .build();

        Articles savedArticle = articlesRepository.save(article);

        Revisions revision = new Revisions.Builder()
                .title(dto.title())
                .subtitle(dto.subtitle())
                .body(dto.body())
                .media(bannerMedia)
                .tags(tags)
                .article(savedArticle) // Link
                .build();

        Revisions savedRevision = revisionsRepository.save(revision);
        savedArticle.setCurrentPublishedRevision(savedRevision);
        articlesRepository.save(savedArticle);

        return new ArticleDTO(savedArticle, savedRevision);
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
                pub == null
                || pub.getYear() != year
                || pub.getMonthValue() != month
                || pub.getDayOfMonth() != day
        ) {
            throw new ResourceNotFoundException("Invalid date on URL for article");
        }

        return new ArticleDTO(article);
    }

    @Transactional
    public Page<ArticleDTO> getAllByQueryParams(String q, Map<String, String> allParams, Pageable pageable) {
        Specification<Articles> spec =
                (root, query, cb) ->
                        cb.equal(root.get("status"), ArticlesStatus.PUBLISHED);

        // SEARCH TITLE OR SUBTITLE
        if (q != null && !q.isBlank()) {
            spec = spec.and((root, query, cb) -> {
                Join<Articles, Revisions> revisionJoin = root.join("currentPublishedRevision");
                String searchLabel = "%" + q.toLowerCase() + "%";
                return cb.or(
                        cb.like(cb.lower(revisionJoin.get("title")), searchLabel),
                        cb.like(cb.lower(revisionJoin.get("subtitle")), searchLabel)
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

        /* TODO PSEUDOCODE TAG:
           if (allParams.containsKey("tag")) {
               spec = spec.and((root, query, cb) ->
                   cb.equal(root.join("categories").get("slug"), allParams.get("tag")));
           }
        */

        return articlesRepository.findAll(spec, pageable).map(ArticleDTO::new);
    }

    public List<String> findAllSlugs() {
        return articlesRepository.findAllSlugs();
    }
}
