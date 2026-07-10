<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${msg("loginTitle", realm.displayName!"")}</title>
  </head>

  <body>
    <main>
      <section>
        <h1>Entrar</h1>

        <#if message?has_content>
          <div>
            <p>${message.summary}</p>
          </div>
        </#if>

        <form id="kc-form-login" action="${url.loginAction}" method="post">
          <div>
            <label for="username">
              <#if !realm.loginWithEmailAllowed>
                Usuário
              <#elseif !realm.registrationEmailAsUsername>
                Usuário ou e-mail
              <#else>
                E-mail
              </#if>
            </label>

            <input
              id="username"
              name="username"
              type="text"
              value="${(login.username!'')}"
              autocomplete="username"
              autofocus
            >
          </div>

          <div>
            <label for="password">Senha</label>

            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
            >
          </div>

          <#if realm.rememberMe && !usernameEditDisabled??>
            <div>
              <label>
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  <#if login.rememberMe??>checked</#if>
                >
                Lembrar-me
              </label>
            </div>
          </#if>

          <div>
            <button id="kc-login" name="login" type="submit">
              Entrar
            </button>
          </div>
        </form>

        <#if realm.resetPasswordAllowed>
          <p>
            <a href="${url.loginResetCredentialsUrl}">
              Esqueci minha senha
            </a>
          </p>
        </#if>

        <#if realm.registrationAllowed>
          <p>
            <a href="${url.registrationUrl}">
              Criar conta
            </a>
          </p>
        </#if>
      </section>
    </main>
  </body>
</html>