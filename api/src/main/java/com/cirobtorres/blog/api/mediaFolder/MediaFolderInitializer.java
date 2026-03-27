package com.cirobtorres.blog.api.mediaFolder;

import com.cirobtorres.blog.api.mediaFolder.entities.MediaFolder;
import com.cirobtorres.blog.api.mediaFolder.repositories.MediaFolderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MediaFolderInitializer implements CommandLineRunner {
    private final MediaFolderRepository folderRepository;
    private static final Logger log = LoggerFactory.getLogger(MediaFolderInitializer.class);

    public MediaFolderInitializer(MediaFolderRepository folderRepository) {
        this.folderRepository = folderRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!folderRepository.existsByPath("/")) {
            MediaFolder home = MediaFolder.builder()
                    .name("Home")
                    .path("/")
                    .parent(null)
                    .build();

            folderRepository.save(home);
            log.debug("'Home' folder was successfully created as the root folder.");
        }
    }
}