package com.cirobtorres.blog.api.controllers;

import com.cirobtorres.blog.api.dtos.ArticleDTO;
import com.cirobtorres.blog.api.dtos.ArticleSaveDTO;
import com.cirobtorres.blog.api.dtos.ArticleSlugDTO;
import com.cirobtorres.blog.api.dtos.AuthorArticleDTO;
import com.cirobtorres.blog.api.dtos.MediaArticleDTO;
import com.cirobtorres.blog.api.dtos.TagDTO;
import com.cirobtorres.blog.api.enums.ArticlesStatus;
import com.cirobtorres.blog.api.exceptions.GlobalExceptionHandler;
import com.cirobtorres.blog.api.exceptions.ResourceNotFoundException;
import com.cirobtorres.blog.api.services.ArticlesService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ArticlesController.class)
@Import({GlobalExceptionHandler.class, ArticlesControllerTest.ControllerSecurityTestConfig.class})
class ArticlesControllerTest {

    private static final String USER_ID = "11111111-1111-1111-1111-111111111111";
    private static final UUID ARTICLE_ID = UUID.fromString("22222222-2222-2222-2222-222222222222");
    private static final UUID TAG_ID = UUID.fromString("33333333-3333-3333-3333-333333333333");
    private static final UUID BANNER_ID = UUID.fromString("44444444-4444-4444-4444-444444444444");

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ArticlesService articlesService;

    private ArticleDTO article;
    private ArticleSaveDTO saveDto;

    @BeforeEach
    void setUp() {
        LocalDateTime now = LocalDateTime.of(2026, 9, 2, 12, 0);
        article = new ArticleDTO(
                ARTICLE_ID,
                "Spring Boot Tips",
                "A practical guide",
                "spring-boot-tips",
                Set.of(new TagDTO(TAG_ID, "Java", "java", now, now)),
                new AuthorArticleDTO("Ciro", "https://cdn.example/avatar.png"),
                new MediaArticleDTO(BANNER_ID, "https://cdn.example/banner.png", "Banner", "Caption"),
                false,
                false,
                "<p>body</p>",
                ArticlesStatus.PUBLISHED,
                4,
                2,
                now,
                now
        );
        saveDto = new ArticleSaveDTO(
                ARTICLE_ID,
                UUID.fromString(USER_ID),
                "Spring Boot Tips",
                "A practical guide",
                "spring-boot-tips",
                Set.of(TAG_ID),
                BANNER_ID,
                ArticlesStatus.DRAFT,
                "<p>body</p>"
        );
    }

    @TestConfiguration
    @EnableMethodSecurity
    static class ControllerSecurityTestConfig {
        @Bean
        SecurityFilterChain articlesControllerTestSecurity(HttpSecurity http) throws Exception {
            return http
                    .csrf(AbstractHttpConfigurer::disable)
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers(HttpMethod.GET, "/articles/**").permitAll()
                            .requestMatchers(HttpMethod.POST, "/articles/**").hasAuthority("AUTHOR")
                            .requestMatchers(HttpMethod.PUT, "/articles/**").hasAuthority("AUTHOR")
                            .requestMatchers(HttpMethod.DELETE, "/articles/**").hasAuthority("AUTHOR")
                            .anyRequest().authenticated()
                    )
                    .build();
        }
    }

    @Nested
    class GetArticlePage {
        @Test
        void returnsArticleForAnonymousUser() throws Exception {
            when(articlesService.getByUrlMetadata(isNull(), eq(2026), eq(9), eq(2), eq("spring-boot-tips")))
                    .thenReturn(article);

            mockMvc.perform(get("/articles/2026/9/2/spring-boot-tips"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(ARTICLE_ID.toString()))
                    .andExpect(jsonPath("$.title").value("Spring Boot Tips"))
                    .andExpect(jsonPath("$.slug").value("spring-boot-tips"))
                    .andExpect(jsonPath("$.status").value("PUBLISHED"))
                    .andExpect(jsonPath("$.likedByCurrentUser").value(false))
                    .andExpect(jsonPath("$.author.name").value("Ciro"));

            verify(articlesService).getByUrlMetadata(null, 2026, 9, 2, "spring-boot-tips");
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void passesAuthenticatedUserId() throws Exception {
            when(articlesService.getByUrlMetadata(eq(UUID.fromString(USER_ID)), eq(2026), eq(9), eq(2), eq("spring-boot-tips")))
                    .thenReturn(article);

            mockMvc.perform(get("/articles/2026/9/2/spring-boot-tips"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(ARTICLE_ID.toString()));

            verify(articlesService).getByUrlMetadata(UUID.fromString(USER_ID), 2026, 9, 2, "spring-boot-tips");
        }

        @Test
        void returns404WhenArticleIsMissing() throws Exception {
            when(articlesService.getByUrlMetadata(isNull(), eq(2026), eq(9), eq(2), eq("missing")))
                    .thenThrow(new ResourceNotFoundException("Article not found"));

            mockMvc.perform(get("/articles/2026/9/2/missing"))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.status").value(404))
                    .andExpect(jsonPath("$.message").value("Article not found"))
                    .andExpect(jsonPath("$.path").value("/articles/2026/9/2/missing"));

            verify(articlesService).getByUrlMetadata(null, 2026, 9, 2, "missing");
        }

        @Test
        void returns400WhenPathTypesAreInvalid() throws Exception {
            mockMvc.perform(get("/articles/year/9/2/spring-boot-tips"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.status").value(400))
                    .andExpect(jsonPath("$.message").value("Invalid value for parameter 'year'"));

            verifyNoInteractions(articlesService);
        }
    }

    @Nested
    class GetAllByQueryParams {
        @Test
        void returnsPagedArticles() throws Exception {
            Page<ArticleDTO> page = new PageImpl<>(List.of(article), PageRequest.of(0, 20), 1);
            when(articlesService.getAllByQueryParams(eq("java"), any(), any(Pageable.class))).thenReturn(page);

            mockMvc.perform(get("/articles").param("q", "java"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content", hasSize(1)))
                    .andExpect(jsonPath("$.content[0].title").value("Spring Boot Tips"))
                    .andExpect(jsonPath("$.page.size").value(20))
                    .andExpect(jsonPath("$.page.totalElements").value(1));

            verify(articlesService).getAllByQueryParams(eq("java"), any(), any(Pageable.class));
        }

        @Test
        void usesDefaultPageableWhenUnspecified() throws Exception {
            when(articlesService.getAllByQueryParams(isNull(), any(), any(Pageable.class)))
                    .thenReturn(Page.empty());

            mockMvc.perform(get("/articles"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content", hasSize(0)));

            verify(articlesService).getAllByQueryParams(
                    isNull(),
                    any(),
                    eq(PageRequest.of(0, 20, Sort.by(Sort.Direction.DESC, "createdAt")))
            );
        }

        @Test
        void returns500WhenServiceFails() throws Exception {
            when(articlesService.getAllByQueryParams(isNull(), any(), any(Pageable.class)))
                    .thenThrow(new RuntimeException("search failed"));

            mockMvc.perform(get("/articles"))
                    .andExpect(status().isInternalServerError())
                    .andExpect(jsonPath("$.status").value(500))
                    .andExpect(jsonPath("$.message").value("search failed"));
        }
    }

    @Nested
    class GetMyArticles {
        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returnsAuthorArticles() throws Exception {
            Page<ArticleDTO> page = new PageImpl<>(List.of(article), PageRequest.of(0, 20), 1);
            when(articlesService.getAllByAuthor(eq(UUID.fromString(USER_ID)), any(Pageable.class))).thenReturn(page);

            mockMvc.perform(get("/articles/me"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content[0].id").value(ARTICLE_ID.toString()));

            verify(articlesService).getAllByAuthor(eq(UUID.fromString(USER_ID)), eq(PageRequest.of(0, 20)));
        }

        @Test
        void returns403WhenAnonymous() throws Exception {
            mockMvc.perform(get("/articles/me"))
                    .andExpect(status().isForbidden());

            verify(articlesService, never()).getAllByAuthor(any(), any());
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "USER")
        void returns403WhenMissingAuthorAuthority() throws Exception {
            mockMvc.perform(get("/articles/me"))
                    .andExpect(status().isForbidden());

            verify(articlesService, never()).getAllByAuthor(any(), any());
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns404WhenAuthorIsMissing() throws Exception {
            when(articlesService.getAllByAuthor(eq(UUID.fromString(USER_ID)), any(Pageable.class)))
                    .thenThrow(new EntityNotFoundException("Author not found"));

            mockMvc.perform(get("/articles/me"))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.message").value("Author not found"));
        }
    }

    @Nested
    class GetMyArticleById {
        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returnsArticleOwnedByAuthor() throws Exception {
            when(articlesService.getByIdForAuthor(ARTICLE_ID, UUID.fromString(USER_ID))).thenReturn(article);

            mockMvc.perform(get("/articles/me/id/{id}", ARTICLE_ID))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(ARTICLE_ID.toString()))
                    .andExpect(jsonPath("$.title").value("Spring Boot Tips"));

            verify(articlesService).getByIdForAuthor(ARTICLE_ID, UUID.fromString(USER_ID));
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns404WhenMissing() throws Exception {
            when(articlesService.getByIdForAuthor(ARTICLE_ID, UUID.fromString(USER_ID)))
                    .thenThrow(new ResourceNotFoundException("Article not found"));

            mockMvc.perform(get("/articles/me/id/{id}", ARTICLE_ID))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.message").value("Article not found"));
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns403WhenServiceDeniesAccess() throws Exception {
            when(articlesService.getByIdForAuthor(ARTICLE_ID, UUID.fromString(USER_ID)))
                    .thenThrow(new AccessDeniedException("You don't have permission to access this Article"));

            mockMvc.perform(get("/articles/me/id/{id}", ARTICLE_ID))
                    .andExpect(status().isForbidden())
                    .andExpect(jsonPath("$.status").value(403))
                    .andExpect(jsonPath("$.message").value("You don't have permission to access this Article"));
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns400ForInvalidUuid() throws Exception {
            mockMvc.perform(get("/articles/me/id/{id}", "not-a-uuid"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message").value("Invalid value for parameter 'id'"));

            verify(articlesService, never()).getByIdForAuthor(any(), any());
        }
    }

    @Nested
    class GetAllSlugs {
        @Test
        void returnsSlugList() throws Exception {
            when(articlesService.getAllSlugs()).thenReturn(List.of("spring-boot-tips", "java-records"));

            mockMvc.perform(get("/articles/slug"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$", hasSize(2)))
                    .andExpect(jsonPath("$[0]").value("spring-boot-tips"))
                    .andExpect(jsonPath("$[1]").value("java-records"));

            verify(articlesService).getAllSlugs();
        }

        @Test
        void returns500WhenServiceFails() throws Exception {
            when(articlesService.getAllSlugs()).thenThrow(new RuntimeException("slug lookup failed"));

            mockMvc.perform(get("/articles/slug"))
                    .andExpect(status().isInternalServerError())
                    .andExpect(jsonPath("$.message").value("slug lookup failed"));
        }
    }

    @Nested
    class GetById {
        @Test
        void returnsArticle() throws Exception {
            when(articlesService.getById(ARTICLE_ID)).thenReturn(article);

            mockMvc.perform(get("/articles/id/{id}", ARTICLE_ID))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(ARTICLE_ID.toString()))
                    .andExpect(jsonPath("$.likeCount").value(4))
                    .andExpect(jsonPath("$.commentCount").value(2));

            verify(articlesService).getById(ARTICLE_ID);
        }

        @Test
        void returns404WhenMissing() throws Exception {
            when(articlesService.getById(ARTICLE_ID)).thenThrow(new ResourceNotFoundException("Article not found"));

            mockMvc.perform(get("/articles/id/{id}", ARTICLE_ID))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.message").value("Article not found"));
        }

        @Test
        void returns400ForInvalidUuid() throws Exception {
            mockMvc.perform(get("/articles/id/{id}", "bad-id"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.status").value(400));

            verify(articlesService, never()).getById(any());
        }
    }

    @Nested
    class GetBySlug {
        @Test
        void returnsArticle() throws Exception {
            when(articlesService.getBySlug(new ArticleSlugDTO("spring-boot-tips"))).thenReturn(article);

            mockMvc.perform(get("/articles/slug/{slug}", "spring-boot-tips"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.slug").value("spring-boot-tips"))
                    .andExpect(jsonPath("$.subtitle").value("A practical guide"));

            verify(articlesService).getBySlug(new ArticleSlugDTO("spring-boot-tips"));
        }

        @Test
        void returns404WhenMissing() throws Exception {
            when(articlesService.getBySlug(new ArticleSlugDTO("missing")))
                    .thenThrow(new EntityNotFoundException("Article not found for slug=missing"));

            mockMvc.perform(get("/articles/slug/{slug}", "missing"))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.message").value("Article not found for slug=missing"));
        }
    }

    @Nested
    class IsSlugAvailable {
        @Test
        void returnsAvailabilityWithoutExcludeId() throws Exception {
            when(articlesService.isSlugAvailable(new ArticleSlugDTO("spring-boot-tips"), null)).thenReturn(true);

            mockMvc.perform(get("/articles/slug/{slug}/check", "spring-boot-tips"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.available").value(true));

            verify(articlesService).isSlugAvailable(new ArticleSlugDTO("spring-boot-tips"), null);
        }

        @Test
        void returnsAvailabilityWithExcludeId() throws Exception {
            when(articlesService.isSlugAvailable(new ArticleSlugDTO("spring-boot-tips"), ARTICLE_ID)).thenReturn(false);

            mockMvc.perform(get("/articles/slug/{slug}/check", "spring-boot-tips")
                            .param("excludeId", ARTICLE_ID.toString()))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.available").value(false));

            verify(articlesService).isSlugAvailable(new ArticleSlugDTO("spring-boot-tips"), ARTICLE_ID);
        }

        @Test
        void returns400WhenExcludeIdIsInvalid() throws Exception {
            mockMvc.perform(get("/articles/slug/{slug}/check", "spring-boot-tips")
                            .param("excludeId", "not-a-uuid"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message").value("Invalid value for parameter 'excludeId'"));

            verify(articlesService, never()).isSlugAvailable(any(), any());
        }
    }

    @Nested
    class CreateArticle {
        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void createsArticle() throws Exception {
            when(articlesService.createArticle(any(ArticleSaveDTO.class))).thenReturn(article);

            mockMvc.perform(post("/articles")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(saveDto)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.id").value(ARTICLE_ID.toString()))
                    .andExpect(jsonPath("$.title").value("Spring Boot Tips"))
                    .andExpect(jsonPath("$.slug").value("spring-boot-tips"));

            verify(articlesService).createArticle(saveDto);
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns400WhenBodyIsInvalid() throws Exception {
            String invalidBody = """
                    {
                      "userId": null,
                      "title": "",
                      "subtitle": "",
                      "slug": "",
                      "tags": [],
                      "banner": null,
                      "body": ""
                    }
                    """;

            mockMvc.perform(post("/articles")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(invalidBody))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.status").value(400))
                    .andExpect(jsonPath("$.message").value("Validation failed"))
                    .andExpect(jsonPath("$.errors.title").value("Title required"))
                    .andExpect(jsonPath("$.errors.userId").value("Must be an user"));

            verify(articlesService, never()).createArticle(any());
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns400WhenJsonIsMalformed() throws Exception {
            mockMvc.perform(post("/articles")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message").value("Malformed JSON request"));

            verify(articlesService, never()).createArticle(any());
        }

        @Test
        void returns401WhenUnauthenticated() throws Exception {
            mockMvc.perform(post("/articles")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(saveDto)))
                    .andExpect(status().isUnauthorized());

            verify(articlesService, never()).createArticle(any());
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns404WhenRelatedResourceIsMissing() throws Exception {
            when(articlesService.createArticle(any(ArticleSaveDTO.class)))
                    .thenThrow(new EntityNotFoundException("Author not found for user_id=" + USER_ID));

            mockMvc.perform(post("/articles")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(saveDto)))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.message").value("Author not found for user_id=" + USER_ID));
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns500WhenServiceFails() throws Exception {
            when(articlesService.createArticle(any(ArticleSaveDTO.class)))
                    .thenThrow(new RuntimeException("persist failed"));

            mockMvc.perform(post("/articles")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(saveDto)))
                    .andExpect(status().isInternalServerError())
                    .andExpect(jsonPath("$.message").value("persist failed"));
        }
    }

    @Nested
    class UnpublishArticle {
        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void unpublishesArticle() throws Exception {
            when(articlesService.unpublishArticle(ARTICLE_ID)).thenReturn(article);

            mockMvc.perform(put("/articles/id/{id}/unpublish", ARTICLE_ID))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(ARTICLE_ID.toString()));

            verify(articlesService).unpublishArticle(ARTICLE_ID);
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns404WhenMissing() throws Exception {
            when(articlesService.unpublishArticle(ARTICLE_ID))
                    .thenThrow(new EntityNotFoundException("Article not found"));

            mockMvc.perform(put("/articles/id/{id}/unpublish", ARTICLE_ID))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.message").value("Article not found"));
        }
    }

    @Nested
    class SaveDraftArticle {
        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void savesDraft() throws Exception {
            when(articlesService.putDraft(eq(ARTICLE_ID), any(ArticleSaveDTO.class), eq(UUID.fromString(USER_ID))))
                    .thenReturn(article);

            mockMvc.perform(put("/articles/id/{id}/draft", ARTICLE_ID)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(saveDto)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(ARTICLE_ID.toString()));

            verify(articlesService).putDraft(ARTICLE_ID, saveDto, UUID.fromString(USER_ID));
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns400WhenBodyIsInvalid() throws Exception {
            mockMvc.perform(put("/articles/id/{id}/draft", ARTICLE_ID)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message").value("Validation failed"));

            verify(articlesService, never()).putDraft(any(), any(), any());
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns403WhenServiceDeniesAccess() throws Exception {
            when(articlesService.putDraft(eq(ARTICLE_ID), any(ArticleSaveDTO.class), eq(UUID.fromString(USER_ID))))
                    .thenThrow(new AccessDeniedException("You don't have permission to access this Article"));

            mockMvc.perform(put("/articles/id/{id}/draft", ARTICLE_ID)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(saveDto)))
                    .andExpect(status().isForbidden());
        }
    }

    @Nested
    class PublishArticle {
        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void publishesArticle() throws Exception {
            when(articlesService.putPublish(eq(ARTICLE_ID), any(ArticleSaveDTO.class), eq(UUID.fromString(USER_ID))))
                    .thenReturn(article);

            mockMvc.perform(put("/articles/id/{id}/publish", ARTICLE_ID)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(saveDto)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.status").value("PUBLISHED"));

            verify(articlesService).putPublish(ARTICLE_ID, saveDto, UUID.fromString(USER_ID));
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns404WhenMissing() throws Exception {
            when(articlesService.putPublish(eq(ARTICLE_ID), any(ArticleSaveDTO.class), eq(UUID.fromString(USER_ID))))
                    .thenThrow(new ResourceNotFoundException("Article not found"));

            mockMvc.perform(put("/articles/id/{id}/publish", ARTICLE_ID)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(saveDto)))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.message").value("Article not found"));
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns500WhenServiceFails() throws Exception {
            when(articlesService.putPublish(eq(ARTICLE_ID), any(ArticleSaveDTO.class), eq(UUID.fromString(USER_ID))))
                    .thenThrow(new RuntimeException("publish failed"));

            mockMvc.perform(put("/articles/id/{id}/publish", ARTICLE_ID)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(saveDto)))
                    .andExpect(status().isInternalServerError())
                    .andExpect(jsonPath("$.message").value("publish failed"));
        }
    }

    @Nested
    class DeleteArticle {
        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void deletesArticle() throws Exception {
            mockMvc.perform(delete("/articles/id/{id}", ARTICLE_ID))
                    .andExpect(status().isNoContent())
                    .andExpect(content().string(""));

            verify(articlesService).deleteArticle(ARTICLE_ID);
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns404WhenMissing() throws Exception {
            doThrow(new EntityNotFoundException("Article not found")).when(articlesService).deleteArticle(ARTICLE_ID);

            mockMvc.perform(delete("/articles/id/{id}", ARTICLE_ID))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.message").value("Article not found"));
        }

        @Test
        @WithMockUser(username = USER_ID, authorities = "AUTHOR")
        void returns400ForInvalidUuid() throws Exception {
            mockMvc.perform(delete("/articles/id/{id}", "bad-id"))
                    .andExpect(status().isBadRequest());

            verify(articlesService, never()).deleteArticle(any());
        }

        @Test
        void returns401WhenUnauthenticated() throws Exception {
            mockMvc.perform(delete("/articles/id/{id}", ARTICLE_ID))
                    .andExpect(status().isUnauthorized());

            verify(articlesService, never()).deleteArticle(any());
        }
    }
}
