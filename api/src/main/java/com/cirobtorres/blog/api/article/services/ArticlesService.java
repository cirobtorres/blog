package com.cirobtorres.blog.api.article.services;

import com.cirobtorres.blog.api.article.dtos.ArticleResponseDTO;
import com.cirobtorres.blog.api.article.dtos.CreateArticlesDTO;
import com.cirobtorres.blog.api.article.entities.Articles;
import com.cirobtorres.blog.api.article.enums.ArticlesStatus;
import com.cirobtorres.blog.api.article.repositories.ArticlesRepository;
import com.cirobtorres.blog.api.author.entities.Author;
import com.cirobtorres.blog.api.author.repositories.AuthorRepository;
import com.cirobtorres.blog.api.media.entities.Media;
import com.cirobtorres.blog.api.media.repositories.MediaRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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
    public ArticleResponseDTO createArticle(CreateArticlesDTO dto) {
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

        articlesRepository.save(article);

        return new ArticleResponseDTO(
                article.getId(),
                article.getTitle(),
                article.getSlug(),
                article.getAuthor().getName()
        );
    }

    public Articles findBySlug(String slug) {
        return articlesRepository.findBySlug(slug)
                .orElseThrow(
                        () -> new RuntimeException("Article slug not found: slug={" + slug + "}")
                );
    }
}
