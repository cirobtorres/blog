package com.cirobtorres.blog.api.mailer;

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

import java.util.List;

@Service
public class MailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final String mailerFrom;
    private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(MailService.class);

    public MailService(
            JavaMailSender mailSender,
            TemplateEngine templateEngine,
            ApiApplicationProperties apiApplicationProperties
    ) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
        this.isProd = apiApplicationProperties.getApplication().isProduction();
        this.mailerFrom = apiApplicationProperties.getApplication().getMailerFrom();
    }

    @Async
    public void sendValidationEmail(
            String to,
            String name,
            String vToken
    ) throws MessagingException {
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("code", vToken.toCharArray());
        String htmlTemplate = templateEngine.process("email-validation", context);
        sendMail(to, "Confirmação de cadastro", htmlTemplate);
    }

    @Async
    public void sendResetPasswordInfoForProviderUsers(
            String to,
            String name,
            List<String> providerNames
    ) throws MessagingException {
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("email", to);

        String providersText = "";

        if (providerNames.size() == 1) {
            providersText = providerNames.getFirst();
        } else if (providerNames.size() > 1) {
            // All elements, except last
            String initialPart = String.join(", ", providerNames.subList(0, providerNames.size() - 1));
            // Add last element plus " e "
            providersText = initialPart + " e " + providerNames.getLast();
        }

        context.setVariable("provider", providersText);

        String htmlTemplate = templateEngine.process("email-reset-provider", context);
        sendMail(to, "Redefinição de senha", htmlTemplate);
    }

    @Async
    public void sendResetPasswordEmail(
            String to,
            String name,
            String code
    ) throws MessagingException {
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("email", to);
        context.setVariable("code", code.toCharArray());
        String htmlTemplate = templateEngine.process("email-reset-password", context);
        sendMail(to, "Redefinição de senha", htmlTemplate);
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
