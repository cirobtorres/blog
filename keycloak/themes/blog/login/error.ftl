<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${msg("errorTitle")}</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/tailwind.css">
  </head>
  <body class="min-h-screen overflow-hidden antialiased bg-stone-100 dark:bg-stone-925">
    <main class="h-full min-h-screen">
      <div class="w-full h-full min-h-screen not-dark:shadow min-[700px]:border-r border-neutral-200 dark:border-neutral-800">
        <div class="h-screen p-1">
          <div class="h-full p-8 overflow-y-auto flex flex-col justify-center">
            <div class="max-w-125 w-full mx-auto flex flex-col justify-center gap-6 text-center">
              
              <!-- Alert icon -->
              <div class="mx-auto size-10 flex items-center justify-center rounded border text-destructive dark:text-neutral-100 border-destructive/75 dark:border-destructive/50 bg-destructive/10 dark:bg-destructive/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>

              <!-- Error message -->
              <div class="flex flex-col gap-2">
                <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  ${kcSanitize(message.summary)?no_esc}
                </h1>
              </div>

              <hr class="border-neutral-200 dark:border-neutral-800" />

              <!-- User actions -->
              <div class="flex flex-col gap-2">

                <#if properties?? && properties.homeUrl??>
                  <a href="${properties.homeUrl}" class="w-full h-9.5 text-sm text-neutral-100 font-medium not-dark:shadow rounded border border-primary bg-primary/75 hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2">
                    Voltar para o aplicativo
                  </a>

                <#elseif client?? && client.baseUrl??>
                  <a href="${client.baseUrl}" class="w-full h-9.5 text-sm text-neutral-100 font-medium not-dark:shadow rounded border border-primary bg-primary/75 hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2">
                    Voltar para o aplicativo
                  </a>

                <#else>
                  <a href="http://localhost:3000" class="w-full h-9.5 text-sm text-neutral-100 font-medium not-dark:shadow rounded border border-primary bg-primary/75 hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2">
                    Voltar para o aplicativo
                  </a>
                </#if>
                
                <#if url.loginRestartFlowUrl??>
                  <a href="${url.loginRestartFlowUrl}" class="w-full h-9.5 text-sm text-neutral-900 dark:text-neutral-100 font-medium not-dark:shadow rounded border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 hover:bg-stone-150 dark:hover:bg-stone-750 transition-all duration-300 flex items-center justify-center gap-2">
                    Recomeçar Login
                  </a>

                <#elseif client?? && client.baseUrl??>
                  <a href="${client.baseUrl}" class="w-full h-9.5 text-sm text-neutral-900 dark:text-neutral-100 font-medium not-dark:shadow rounded border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 hover:bg-stone-150 dark:hover:bg-stone-750 transition-all duration-300 flex items-center justify-center gap-2">
                    Ir para a página de login
                  </a>

                <#else>
                  <a href="http://localhost:3000" class="w-full h-9.5 text-sm text-neutral-900 dark:text-neutral-100 font-medium not-dark:shadow rounded border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 hover:bg-stone-150 dark:hover:bg-stone-750 transition-all duration-300 flex items-center justify-center gap-2">
                    Ir para a página de login
                  </a>
                </#if>
                
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="hidden min-[700px]:block grayscale flex justify-center items-center [background:linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,0.25)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')] dark:[background:linear-gradient(90deg,rgba(0,0,0,1),rgba(0,0,0,0.25)),radial-gradient(circle,rgba(0,0,0,0.0),rgba(0,0,0,1)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')]" />
    </main>
  </body>
</html>