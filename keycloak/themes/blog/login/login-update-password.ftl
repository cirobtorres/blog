<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinir senha</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/login.css">
    <link rel="stylesheet" href="${url.resourcesPath}/css/tailwind.css">
  </head>
  <body class="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased h-screen">
    <main class="h-full min-h-screen">
      <div class="w-full h-full min-h-screen not-dark:shadow min-[700px]:border-r border-neutral-200 dark:border-neutral-800">
        <div class="h-screen p-1">
          <div class="h-full p-8 overflow-y-auto flex flex-col justify-center">
            <div class="max-w-125 w-full mx-auto flex flex-col justify-center gap-6">
              <div class="flex flex-col gap-2">
                <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  Redefinir senha
                </h1>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  Crie uma nova senha para continuar usando sua conta.
                </p>
              </div>
              <hr class="border-neutral-200 dark:border-neutral-800" />
              <#if message?? && message.summary??>
                <div class="p-4 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-sm text-red-800 dark:text-red-300">
                  ${message.summary}
                </div>
              </#if>
              <form id="kc-passwd-update-form" action="${url.loginAction}" method="post" class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                  <label for="password-new" class="text-xs font-bold text-neutral-500">
                    Nova senha
                  </label>
                  <input
                    id="password-new"
                    name="password-new"
                    type="password"
                    autocomplete="new-password"
                    autofocus
                    class="w-full h-10 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <#if messagesPerField.existsError("password")>
                    <p class="text-xs font-medium text-red-500">
                      ${kcSanitize(messagesPerField.get("password"))?no_esc}
                    </p>
                  </#if>
                </div>
                <div class="flex flex-col gap-1">
                  <label for="password-confirm" class="text-xs font-bold text-neutral-500">
                    Confirmar senha
                  </label>
                  <input
                    id="password-confirm"
                    name="password-confirm"
                    type="password"
                    autocomplete="new-password"
                    class="w-full h-10 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <#if messagesPerField.existsError("password-confirm")>
                    <p class="text-xs font-medium text-red-500">
                      ${kcSanitize(messagesPerField.get("password-confirm"))?no_esc}
                    </p>
                  </#if>
                </div>
                <#if isAppInitiatedAction??>
                  <label class="flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-500">
                    <input
                      id="logout-sessions"
                      name="logout-sessions"
                      type="checkbox"
                      value="on"
                      checked
                    />
                    Sair dos outros dispositivos
                  </label>
                </#if>
                <button
                  type="submit"
                  class="w-full h-9.5 text-neutral-100 bg-primary/65 border-primary font-medium flex items-center justify-center rounded transition-all shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Salvar nova senha
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden min-[700px]:block grayscale flex justify-center items-center [background:linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,0.25)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')] dark:[background:linear-gradient(90deg,rgba(0,0,0,1),rgba(0,0,0,0.25)),radial-gradient(circle,rgba(0,0,0,0.0),rgba(0,0,0,1)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')]" />
    </main>
  </body>
</html>