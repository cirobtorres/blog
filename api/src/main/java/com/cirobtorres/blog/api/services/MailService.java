package com.cirobtorres.blog.api.services;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class MailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final String mailerFrom;
    private static final Logger log = LoggerFactory.getLogger(MailService.class);

    public MailService(
            JavaMailSender mailSender,
            TemplateEngine templateEngine,
            ApiApplicationProperties apiApplicationProperties
    ) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
        this.mailerFrom = apiApplicationProperties.getApplication().getMailerFrom();
    }

    @Async
    public void sendQuickContactEmail(
            String to,
            String name,
            String title, // Exp: "Blog John Doe"
            String body,
            String subject, // Exp: "Listen up, we have news!"
            String template // Exp: "my-email-template.html"
    ) throws MessagingException {
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("title", title);
        context.setVariable("body", body);
        context.setVariable("subject", subject);
        String htmlTemplate = templateEngine.process(template, context);
        sendMail(to, subject, htmlTemplate);
    }

    private void sendMail(
            String to,
            String subject,
            String htmlContent
    ) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setFrom(new InternetAddress(mailerFrom));
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }
}
