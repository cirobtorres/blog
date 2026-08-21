<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${msg("emailLinkIdpTitle", idpDisplayName)}</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/tailwind.css">
  </head>

  <body class="h-screen antialiased text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-neutral-950">
    <main class="h-full min-h-screen grid min-[700px]:grid-cols-[700px_1fr]">
      <div class="w-full h-full min-h-screen not-dark:shadow min-[700px]:border-r border-neutral-200 dark:border-neutral-800">
        <div class="h-screen p-1">
          <div class="h-full p-8 overflow-y-auto scrollbar flex flex-col justify-center">
            <div class="max-w-125 w-full mx-auto flex flex-col justify-center gap-6">
              <div class="flex flex-col gap-2">
                <h1 class="text-3xl font-bold">
                  ${msg("emailLinkIdpTitle", idpDisplayName)}
                </h1>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  Precisamos confirmar seu endereço de e-mail antes de vincular
                  sua conta.
                </p>
              </div>
              
              <div class="my-1 w-full h-px bg-linear-to-r from-transparent via-stone-400 to-transparent dark:via-stone-700"></div>

              <div class="p-4 rounded-lg text-sm text-informative dark:text-informative border border-informative/50 bg-informative/10 dark:bg-informative/10">
                <span class="font-bold block mb-1">
                  Confirmação necessária
                </span>

                <p>
                  ${msg(
                    "emailLinkIdp1",
                    idpDisplayName,
                    brokerContext.username,
                    realm.displayName
                  )}
                </p>
              </div>

              <div class="flex flex-col gap-3">
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  ${msg("emailLinkIdp2")}

                  <a
                    href="${url.loginAction}"
                    class="font-bold text-primary underline underline-offset-2 border border-transparent rounded transition-all duration-300 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary"
                  >
                    ${msg("emailLinkIdp3")}
                  </a>
                </p>

                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  ${msg("emailLinkIdp4")}

                  <a
                    href="${url.loginAction}"
                    class="font-bold text-primary underline underline-offset-2 border border-transparent rounded transition-all duration-300 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary"
                  >
                    ${msg("emailLinkIdp5")}
                  </a>
                </p>
              </div>

              <#if auth?? && auth.showTryAnotherWayLink()>
                <form
                  action="${url.loginAction}"
                  method="post"
                  class="w-full"
                >
                  <input
                    type="hidden"
                    name="tryAnotherWay"
                    value="on"
                  >

                  <button
                    type="submit"
                    class="w-full h-9.5 cursor-pointer text-base flex justify-center items-center gap-2 rounded border border-stone-300 dark:border-stone-700 text-neutral-900 dark:text-neutral-100 not-dark:shadow font-medium bg-stone-100 dark:bg-stone-800 transition-all duration-300 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary"
                  >
                    ${msg("doTryAnotherWay")}
                  </button>
                </form>
              </#if>

              <div class="my-1 w-full h-px bg-linear-to-r from-transparent via-stone-400 to-transparent dark:via-stone-700"></div>

              <p class="text-xs text-center font-medium text-neutral-500">
                O vínculo será concluído somente após a confirmação do e-mail.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        class="hidden min-[700px]:block grayscale bg-cover bg-center [background:linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,0.25)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')] dark:[background:linear-gradient(90deg,rgba(0,0,0,1),rgba(0,0,0,0.25)),radial-gradient(circle,rgba(0,0,0,0),rgba(0,0,0,1)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')]"
      ></div>
    </main>
  </body>
</html>