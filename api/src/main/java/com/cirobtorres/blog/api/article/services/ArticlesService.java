package com.cirobtorres.blog.api.article.services;

import com.cirobtorres.blog.api.article.dtos.CreateArticlesDTO;
import com.cirobtorres.blog.api.article.entities.Articles;
import com.cirobtorres.blog.api.article.repositories.ArticlesRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class ArticlesService {
    private final ArticlesRepository articlesRepository;

    public ArticlesService(
            ArticlesRepository articlesRepository
    ) {
        this.articlesRepository = articlesRepository;
    }

    @Transactional
    public Articles createArticle(CreateArticlesDTO dto) {
        Articles article = new Articles.Builder()
                .title(dto.title())
                .subtitle(dto.subtitle())
                .body(dto.body())
                .slug(dto.slug())
                .bannerUrl(dto.bannerUrl())
                .build();

        return articlesRepository.save(article);
    }

    public Articles findBySlug(String slug) {
        return articlesRepository.findBySlug(slug)
                .orElseThrow(
                        () -> new RuntimeException("Article slug not found: slug={" + slug + "}")
                );
    }
}
