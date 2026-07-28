<#import "user-profile-commons.ftl" as userProfileCommons>

<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Revisar Perfil</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/tailwind.css">
  </head>
  <body class="h-screen antialiased text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-[oklch(0.18_0.005_85.1)] **:selection:text-white **:selection:bg-primary/75">
    <main class="h-full min-h-screen grid min-[700px]:grid-cols-[700px_1fr]">
      <div class="w-full h-full min-h-screen not-dark:shadow min-[700px]:border-r border-stone-200 dark:border-stone-700">
        <div class="h-screen p-1">
          <div class="h-full p-8 overflow-y-auto scrollbar flex flex-col justify-center">
            <div class="max-w-125 w-full mx-auto flex flex-col justify-center gap-6">
              <div class="flex flex-col gap-2">
                <h1 class="text-3xl font-bold">
                  Revisar Perfil
                </h1>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  Complete ou confirme as informações abaixo para finalizar o login com sua conta.
                </p>
              </div>
              <hr class="border-stone-200 dark:border-stone-700" />
              <#if message?? && message.summary??>
                <div class="p-4 rounded bg-linear-to-r from-rose-500/25 to-rose-500/5 border border-rose-500/50 text-sm text-neutral-100">
                  <span class="font-bold block mb-1">Ação necessária</span>
                  ${message.summary}
                </div>
              </#if>
              <form id="kc-idp-review-profile-form" action="${url.loginAction}" method="post" class="w-full flex flex-col justify-center gap-2">
                <div class="kc-user-profile-form [&_.required]:text-rose-600 [&_input]:w-full [&_input]:text-neutral-900 [&_input]:dark:text-neutral-400 [&_input]:border [&_input]:border-stone-200 [&_input]:border-stone-700 [&_input]:px-2 [&_input]:py-1 [&_input]:rounded [&_input]:bg-stone-100 [&_input]:dark:bg-stone-800 [&_input]:mb-2 [&_input]:transition-all [&_input]:focus-visible:outline-none [&_input]:focus-visible:ring-3 [&_input]:dark:focus-visible:ring-2 [&_input]:focus-visible:ring-stone-900/25 [&_input]:dark:focus-visible:ring-stone-100 [&_input]:focus-visible:ring-offset-2 [&_input]:focus-visible:ring-offset-stone-950 [&_input]:focus-visible:border-primary [&_input]:dark:focus-visible:border-primary [&_input]:text-neutral-900 [&_input]:dark:text-neutral-400 [&_input]:bg-stone-100 [&_input]:dark:bg-stone-800 [&_input]:focus:placeholder:text-neutral-500 [&_input]:focus-within:bg-stone-stone-600 [&_input]:dark:focus-within:bg-stone-stone-750">
                  <@userProfileCommons.userProfileFormFields/>
                </div>
                  <button type="submit" class="cursor-pointer border disabled:cursor-auto text-sm font-medium inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 shrink-0 outline-none group/button select-none gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 not-dark:shadow [&_svg]:shrink-0 [&_svg]:pointer-events-none [&_svg]:size-4 focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary text-neutral-100 bg-primary/75 border-primary focus-visible:bg-primary/80 rounded h-9.5">
                    Confirmar
                  </button>
                </form>
                <hr class="border-stone-200 dark:border-stone-700" />
                <p class="text-xs text-center font-medium text-neutral-500">
                    Essas informações serão usadas para criar ou atualizar seu perfil.
                </p>
              </div>
            </div>
          </div>
        </div>
      <div class="hidden min-[700px]:block grayscale flex justify-center items-center [background:linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,0.25)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')] dark:[background:linear-gradient(90deg,rgba(0,0,0,1),rgba(0,0,0,0.25)),radial-gradient(circle,rgba(0,0,0,0.0),rgba(0,0,0,1)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')]" />
    </main>
  </body>
</html>