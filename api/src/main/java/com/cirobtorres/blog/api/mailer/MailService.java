package com.cirobtorres.blog.api.mailer;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.IOException;

@Service
public class MailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final String from;
    private final String webUrl;
    private final String apiUrl;
    private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(MailService.class);

    public MailService(
            JavaMailSender mailSender,
            TemplateEngine templateEngine,
            ApiApplicationProperties apiApplicationProperties
    ) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
        this.from = apiApplicationProperties.getMailer().getFromSMTP();
        this.isProd = apiApplicationProperties.getApplication().isProduction();
        this.webUrl = apiApplicationProperties.getFrontend().getUrl();
        this.apiUrl = apiApplicationProperties.getApplication().getUrl();
    }

    public void sendValidationEmail(
            String to,
            String name,
            String vToken
    ) throws MessagingException {
        if (!isProd) log.info("VerificationTokenService.sendValidationEmail");

        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("code", vToken.toCharArray());

        String htmlTemplate = templateEngine.process("email-validation", context);
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        mimeMessage.setFrom(new InternetAddress(from));
        mimeMessage.setRecipients(MimeMessage.RecipientType.TO, to);
        mimeMessage.setSubject("Confirmação de cadastro");

        mimeMessage.setContent(htmlTemplate, "text/html; charset=utf-8");

        mailSender.send(mimeMessage);
    }
}
