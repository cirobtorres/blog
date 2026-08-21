<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Método de confirmação</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/tailwind.css">
  </head>
  <body class="h-screen antialiased text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-stone-925">
    <main class="h-full min-h-screen grid min-[700px]:grid-cols-[700px_1fr]">
      <div class="w-full h-full min-h-screen not-dark:shadow min-[700px]:border-r border-stone-200 dark:border-stone-700">
        <div class="h-screen p-1">
          <div class="h-full p-8 overflow-y-auto scrollbar flex flex-col justify-center">
            <div class="max-w-125 w-full mx-auto flex flex-col justify-center gap-6">
              
              <div class="flex flex-col gap-2">
                <h1 class="text-3xl font-bold">
                  Selecione o método de confirmação
                </h1>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  Como você quer confirmar sua conta?
                </p>
              </div>

              <div class="my-1 w-full h-px bg-linear-to-r from-transparent via-stone-400 to-transparent dark:via-stone-700"></div>

                <form id="kc-select-credential-form" action="${url.loginAction}" method="post" class="flex flex-col gap-3">
                  <#if auth?? && auth.authenticationSelections??>
                    <#list auth.authenticationSelections as execution>
                      <button
                          type="submit"
                          name="authenticationExecution"
                          value="${execution.authExecId}"
                          class="w-full h-9.5 cursor-pointer flex justify-center items-center gap-2 rounded border border-stone-300 dark:border-stone-700 not-dark:shadow bg-stone-100 dark:bg-stone-800 transition-all duration-300 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary"
                      >
                      
                        <span class="font-medium text-base text-neutral-900 dark:text-neutral-100">
                        ${msg(execution.label!"")!execution.label!"Opção de autenticação"}
                        </span>

                        <#if execution.helpText??>
                          <span class="text-xs text-neutral-500 dark:text-neutral-400">
                              ${msg(execution.helpText!"")!execution.helpText}
                          </span>
                        </#if>

                      </button>
                    </#list>
                  </#if>
                </form>

            </div>
          </div>
        </div>
      </div>
      <div class="hidden min-[700px]:block grayscale flex justify-center items-center [background:linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,0.25)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')] dark:[background:linear-gradient(90deg,rgba(0,0,0,1),rgba(0,0,0,0.25)),radial-gradient(circle,rgba(0,0,0,0.0),rgba(0,0,0,1)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')]" />
    </main>
  </body>
</html>