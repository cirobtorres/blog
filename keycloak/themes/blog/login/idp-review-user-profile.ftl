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
                <!--<div class="kc-user-profile-form [&_.required]:text-rose-600 [&_input]:h-9.75 [&_input]:w-full [&_input]:text-neutral-900 [&_input]:dark:text-neutral-400 [&_input]:border [&_input]:border-stone-300 [&_input]:dark:border-stone-700 [&_input]:px-2 [&_input]:py-1 [&_input]:rounded [&_input]:bg-stone-100 [&_input]:dark:bg-stone-800 [&_input]:mb-2 [&_input]:transition-all [&_input]:duration-300 [&_input]:not-dark:shadow [&_input]:focus-visible:outline-none [&_input]:dark:focus-visible:outline-none [&_input]:focus-visible:ring-2 [&_input]:dark:focus-visible:ring-2 [&_input]:focus-visible:ring-primary [&_input]:dark:focus-visible:ring-stone-100 [&_input]:dark:focus-visible:ring-offset-2 [&_input]:dark:focus-visible:ring-offset-stone-950 [&_input]:focus-visible:border-primary [&_input]:dark:focus-visible:border-primary [&_input]:text-neutral-900 [&_input]:dark:text-neutral-400 [&_input]:bg-stone-100 [&_input]:dark:bg-stone-800 [&_input]:focus:placeholder:text-neutral-500 [&_input]:focus-within:bg-stone-stone-600 [&_input]:dark:focus-within:bg-stone-stone-750">-->
                  <!--<@userProfileCommons.userProfileFormFields/>-->

                  <div class="relative w-full rounded not-dark:shadow">

                    <input type="email" id="email" name="email" value="${(profile.attributesByName.email.value!(user.email!''))}" autocomplete="email" required aria-invalid="<#if messagesPerField.existsError('email')>true<#else>false</#if>" placeholder="" class="h-full w-full px-2 pt-4.25 pb-1 text-xs font-medium rounded peer transition-all duration-300 placeholder:text-transparent placeholder:select-none border text-neutral-900 dark:text-neutral-400 focus:placeholder:text-neutral-500 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 <#if messagesPerField.existsError('email')>bg-destructive/10 border-destructive/75 dark:border-destructive/50<#else>bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 focus-visible:border-primary dark:focus-visible:border-primary</#if>"/>

                    <label for="email" class="absolute origin-left top-1/2 z-10 inset-s-1 px-1.5 font-medium select-none text-sm pointer-events-none bg-transparent bg-opacity-50 transform transition-top duration-100 -translate-y-4.5 peer-focus:-translate-y-4.5 peer-placeholder-shown:-translate-y-1/2 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 text-neutral-900 peer-focus:text-neutral-900 peer-placeholder-shown:text-neutral-900 dark:text-neutral-100 dark:peer-focus:text-neutral-100 dark:peer-placeholder-shown:text-neutral-100">
                      E-mail
                    </label>

                  </div>
                  
                  <#if messagesPerField.existsError('email')>
                    <span role="alert" class="mx-2 text-xs font-medium text-destructive">
                      ${kcSanitize(messagesPerField.get('email'))?no_esc}
                    </span>
                  </#if>

                  <div class="relative w-full rounded not-dark:shadow">

                    <input type="text" id="firstName" name="firstName" value="${(profile.attributesByName.firstName.value!(user.firstName!''))}" required aria-invalid="<#if messagesPerField.existsError('firstName')>true<#else>false</#if>" placeholder="Nome Completo" class="h-full w-full px-2 pt-4.25 pb-1 text-xs font-medium rounded peer transition-all duration-300 placeholder:text-transparent placeholder:select-none border text-neutral-900 dark:text-neutral-400 focus:placeholder:text-neutral-500 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 <#if messagesPerField.existsError('firstName')>bg-destructive/10 border-destructive/75 dark:border-destructive/50<#else>bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 focus-visible:border-primary dark:focus-visible:border-primary</#if>"/>

                    <label for="firstName" class="absolute origin-left top-1/2 z-10 inset-s-1 px-1.5 font-medium select-none text-sm pointer-events-none bg-transparent bg-opacity-50 transform transition-top duration-100 -translate-y-4.5 peer-focus:-translate-y-4.5 peer-placeholder-shown:-translate-y-1/2 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 text-neutral-900 peer-focus:text-neutral-900 peer-placeholder-shown:text-neutral-900 dark:text-neutral-100 dark:peer-focus:text-neutral-100 dark:peer-placeholder-shown:text-neutral-100">
                      Nome Completo
                    </label>

                  </div>

                  <#if messagesPerField.existsError('firstName')>
                    <span role="alert" class="mx-2 text-xs font-medium text-destructive">
                      ${kcSanitize(messagesPerField.get('firstName'))?no_esc}
                    </span>
                  </#if>

                <!--</div>-->
                
                  <button type="submit" class="cursor-pointer border disabled:cursor-auto text-sm font-medium inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 shrink-0 outline-none group/button select-none gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 not-dark:shadow [&_svg]:shrink-0 [&_svg]:pointer-events-none [&_svg]:size-4 text-neutral-100 bg-primary/75 border-primary rounded h-9.5 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
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