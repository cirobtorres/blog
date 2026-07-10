<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinir senha</title>
  </head>
  <body>
    <main>
      <section>
        <h1>Redefinir senha</h1>
        <p>
          Informe seu usuário ou e-mail. Enviaremos um link para redefinição de senha.
        </p>
        <#if message?has_content>
          <div>
            <p>${message.summary}</p>
          </div>
        </#if>
        <form id="kc-reset-password-form" action="${url.loginAction}" method="post">
          <div>
            <label for="username">
              <#if !realm.loginWithEmailAllowed>
                Usuário
              <#else>
                Usuário ou e-mail
              </#if>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value="${(auth.attemptedUsername!'')}"
              autocomplete="username"
              autofocus
            >
          </div>
          <div>
            <button type="submit">
              Enviar link
            </button>
          </div>
        </form>
        <p>
          <a href="${url.loginUrl}">
            Voltar para login
          </a>
        </p>
      </section>
    </main>
  </body>
</html>