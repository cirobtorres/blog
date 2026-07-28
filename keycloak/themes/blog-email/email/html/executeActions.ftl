<#setting url_escaping_charset='UTF-8'>
<!DOCTYPE html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background:#f5f5f4;font-family:Arial,sans-serif;color:#171717;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f4;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;padding:32px;">
            <tr>
              <td>
                <h1 style="margin:8px 0;font-size:24px;line-height:32px;color:#171717;">
                    Confirmar e-mail
                </h1>
                <p style="margin:8px 0;font-size:16px;line-height:24px;color:#404040;">
                    Olá, <strong>${user.firstName!"Usuário"}</strong>,
                </p>
                <p style="margin:8px 0;font-size:16px;line-height:24px;color:#404040;">
                    Clique no link de confirmação abaixo.
                </p>
                <a href="${properties['webUrl']!'http://localhost:3000'}/api/auth/validate-email?keycloak_link=${link?url('UTF-8')}" style="display:inline-block;color:#7c3aed;text-decoration:underline;font-size:14px;font-weight:700;">
                    Confirmar
                </a>
                <p style="margin:8px 0;font-size:12px;line-height:18px;color:#7c3aed;">
                    ${link?url('UTF-8')}
                </p>
                <p style="margin:8px 0;font-size:12px;">
                    Importante: se você não pediu essa confirmação, ignore este e-mail.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
