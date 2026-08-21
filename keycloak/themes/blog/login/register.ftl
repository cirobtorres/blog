<#setting url_escaping_charset="UTF-8">
<!DOCTYPE html>
<html lang="${locale.currentLanguageTag!'pt-BR'}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex,nofollow">
    <title>${msg("registerTitle")}</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/tailwind.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js" defer></script>
  </head>
  <body class="h-screen antialiased bg-stone-100 dark:bg-stone-925">
    <main class="min-h-screen grid min-[700px]:grid-cols-[700px_1fr]">
      
      <div class="w-full h-full min-h-screen not-dark:shadow min-[700px]:border-r border-stone-200 dark:border-stone-800">
        <div class="h-screen p-1">
          <div class="h-full p-8 overflow-y-auto flex flex-col justify-center scrollbar">
            <div class="max-w-125 w-full mx-auto flex flex-col justify-center gap-2">
              
              <a href="${properties['homeUrl']!'http://localhost:3000/'}" class="ml-0 mr-auto mb-4 text-sm font-medium text-primary/75 underline underline-offset-2 transition-all duration-300 rounded border border-transparent focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
                Home
              </a>

              <div class="mb-8">
                <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  Cadastro
                </h1>
              </div>

              <#if message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
                <div class="p-3 rounded border text-sm flex items-start gap-2 <#if message.type == 'error'>bg-destructive/10 border-destructive/50 text-neutral-100 dark:text-neutral-100<#else>text-informative dark:text-informative border border-informative/50 bg-informative/10 dark:bg-informative/10</#if>">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>${kcSanitize(message.summary)?no_esc}</span>
                </div>
              </#if>

              <form id="kc-register-form" action="${url.registrationAction}" method="post" class="flex flex-col gap-2">

                <!-- Full name -->
                <div class="relative w-full rounded not-dark:shadow">
                  <input type="text" id="firstName" name="firstName" value="${(register.formData.firstNamerequired !'')}" required aria-invalid="<#if messagesPerField.existsError('firstName')>true<#else>false</#if>" placeholder="Nome Completo" class="h-full w-full px-2 pt-4.25 pb-1 text-xs font-medium rounded peer transition-all duration-300 placeholder:text-transparent placeholder:select-none border text-neutral-900 dark:text-neutral-400 focus:placeholder:text-neutral-500 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 <#if messagesPerField.existsError('firstName')>bg-destructive/10 border-destructive/75 dark:border-destructive/50<#else>bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 focus-visible:border-primary dark:focus-visible:border-primary</#if>"/>
                  <label for="firstName" class="absolute origin-left top-1/2 z-10 inset-s-1 px-1.5 font-medium select-none text-sm pointer-events-none bg-transparent bg-opacity-50 transform transition-top duration-100 -translate-y-4.5 peer-focus:-translate-y-4.5 peer-placeholder-shown:-translate-y-1/2 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 text-neutral-900 peer-focus:text-neutral-900 peer-placeholder-shown:text-neutral-900 dark:text-neutral-100 dark:peer-focus:text-neutral-100 dark:peer-placeholder-shown:text-neutral-100">
                    Nome Completo
                  </label>
                </div>
                <#if messagesPerField.existsError('firstName')>
                  <span role="alert" class="mx-2 text-xs font-medium text-destructive">
                    ${kcSanitize(messagesPerField.get('firstName'))?no_esc}
                  </span>
                </#if>

                <!-- Email -->
                <div class="relative w-full rounded not-dark:shadow">
                  <input type="email" id="email" name="email" value="${(register.formData.email!'')}" autocomplete="email" required aria-invalid="<#if messagesPerField.existsError('email')>true<#else>false</#if>" placeholder="" class="h-full w-full px-2 pt-4.25 pb-1 text-xs font-medium rounded peer transition-all duration-300 placeholder:text-transparent placeholder:select-none border text-neutral-900 dark:text-neutral-400 focus:placeholder:text-neutral-500 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 <#if messagesPerField.existsError('email')>bg-destructive/10 border-destructive/75 dark:border-destructive/50<#else>bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 focus-visible:border-primary dark:focus-visible:border-primary</#if>"/>
                  <label for="email" class="absolute origin-left top-1/2 z-10 inset-s-1 px-1.5 font-medium select-none text-sm pointer-events-none bg-transparent bg-opacity-50 transform transition-top duration-100 -translate-y-4.5 peer-focus:-translate-y-4.5 peer-placeholder-shown:-translate-y-1/2 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 text-neutral-900 peer-focus:text-neutral-900 peer-placeholder-shown:text-neutral-900 dark:text-neutral-100 dark:peer-focus:text-neutral-100 dark:peer-placeholder-shown:text-neutral-100">
                    E-mail
                  </label>
                </div>
                <#if messagesPerField.existsError('email')>
                  <span role="alert" class="mx-2 text-xs font-medium text-destructive">
                    ${kcSanitize(messagesPerField.get('email'))?no_esc}
                  </span>
                </#if>

                <!-- Password -->
                <div class="relative w-full rounded not-dark:shadow flex items-center">
                  <input type="password" id="password" name="password" autocomplete="new-password" required aria-invalid="<#if messagesPerField.existsError('password')>true<#else>false</#if>" placeholder="" class="h-full w-full px-2 pt-4.25 pb-1 text-xs font-medium rounded peer transition-all duration-300 placeholder:text-transparent placeholder:select-none border text-neutral-900 dark:text-neutral-400 focus:placeholder:text-neutral-500 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 <#if messagesPerField.existsError('password')>bg-destructive/10 border-destructive/75 dark:border-destructive/50<#else>bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 focus-visible:border-primary dark:focus-visible:border-primary</#if>"/>
                  <label for="password" class="absolute origin-left top-1/2 z-10 inset-s-1 px-1.5 font-medium select-none text-sm pointer-events-none bg-transparent bg-opacity-50 transform transition-top duration-100 -translate-y-4.5 peer-focus:-translate-y-4.5 peer-placeholder-shown:-translate-y-1/2 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 text-neutral-900 peer-focus:text-neutral-900 peer-placeholder-shown:text-neutral-900 dark:text-neutral-100 dark:peer-focus:text-neutral-100 dark:peer-placeholder-shown:text-neutral-100">
                    Senha
                  </label>
                  
                  <!-- Buttons -->
                  <div class="absolute right-1 flex items-center gap-1 z-20">

                    <button type="button" id="btn-generate-password" title="Gerar senha forte" class="cursor-pointer inline-flex items-center text-center text-nowrap text-xs font-medium h-7.25 space-x-2 px-2 py-1.25 max-w-24 border border-stone-300 dark:border-stone-700 rounded not-dark:shadow transition-all duration-300 text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-stone-800 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
                      <span class="truncate">Senha Forte</span>
                    </button>

                    <button id="btn-copy-password" type="button" title="Copiar senha" class="inline-flex items-center text-center text-nowrap text-xs font-medium h-7.25 space-x-2 px-2 py-1.25 border border-stone-300 dark:border-stone-700 rounded not-dark:shadow transition-all duration-300 cursor-pointer text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-stone-800 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary max-[400px]:hidden">
                      <div class="size-4 flex-shrink-0 mr-1">
                        <svg id="copyIconDefault" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="block size-4">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                        <svg id="copyIconCopied" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="hidden size-4">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      <div class="h-4 w-full overflow-hidden flex items-center">
                        <span id="copyTextDefault" class="truncate block">
                          Copiar
                        </span>
                        <span id="copyTextCopied" class="truncate hidden">
                          Copiado
                        </span>
                      </div>
                    </button>

                    <button type="button" id="btn-toggle-password" title="Alternar visibilidade" class="size-7.25 cursor-pointer flex items-center justify-center not-dark:shadow transition-all duration-300 border border-stone-300 dark:border-stone-700 rounded text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-stone-800 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="icon-eye-open" class="block"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="icon-eye-closed" class="hidden"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                    </button>

                  </div>
                </div>

                <!-- Password Bar (Zxcvbn) -->
                <div class="flex flex-col gap-1.5">
                  <div class="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden border border-stone-300 dark:border-stone-700">
                    <div id="strength-bar-fluid" class="h-full w-0 transition-all duration-500 ease-out bg-transparent"></div>
                  </div>
                  <span id="strength-text" class="text-xs font-medium text-neutral-600 dark:text-neutral-500 transition-colors duration-300">
                    Senha não informada
                  </span>
                  <div id="strength-feedback" class="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed hidden flex-col gap-0.5 px-0.5"></div>
                </div>

                <!-- Pass confirmation (Keycloak) -->
                <input type="hidden" id="password-confirm" name="password-confirm" value="" />

                <!-- Checkbox -->
                <label for="termsAccepted" class="relative cursor-pointer select-none flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-500">
                  <input type="checkbox" id="termsAccepted" name="termsAccepted" required aria-invalid="<#if messagesPerField.existsError('termsAccepted')>true<#else>false</#if>" value="true" <#if (register.formData['termsAccepted']!'') == 'true'>checked</#if> class="peer sr-only"/>
                  <div class="size-4 flex items-center justify-center rounded border text-transparent transition-all duration-300 peer-checked:bg-primary dark:peer-checked:bg-primary peer-checked:border-primary dark:peer-checked:border-primary peer-checked:text-neutral-100 peer-focus-visible:outline-none dark:peer-focus-visible:outline-none peer-focus-visible:ring-2 dark:peer-focus-visible:ring-2 peer-focus-visible:ring-primary dark:peer-focus-visible:ring-stone-100 dark:peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-stone-950 dark:peer-focus-visible:ring-offset-stone-950 <#if messagesPerField.existsError('termsAccepted')>bg-destructive/10 border-destructive/75 dark:border-destructive/50<#else>bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 peer-[:not(:checked)]:focus-visible:border-primary dark:peer-[:not(:checked)]:focus-visible:border-primary peer-focus-visible:border-primary dark:peer-focus-visible:border-primary</#if>"/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <p>Li e aceito os <a href="#" class="font-medium text-primary/75 underline underline-offset-2 transition-all duration-300 rounded border border-transparent focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">Termos de Serviço</a> e a <a href="#" class="font-medium text-primary/75 underline underline-offset-2 transition-all duration-300 rounded border border-transparent focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">Política de Privacidade</a>.</p>
                </label>

                <#if messagesPerField.existsError('termsAccepted')>
                  <span role="alert" class="mx-2 text-xs font-medium text-destructive">
                    ${kcSanitize(messagesPerField.getFirstError('termsAccepted'))?no_esc}
                  </span>
                </#if>

                <!-- Button Submit -->
                <button id="kc-register-btn" type="submit" class="w-full h-9.5 flex justify-center items-center gap-1 cursor-pointer disabled:cursor-auto disabled:opacity-50 text-sm text-neutral-100 font-medium not-dark:shadow rounded border border-primary bg-primary/75 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
                  <span id="btn-text">Confirmar</span>

                  <div id="btn-spinner" role="status" aria-label="Carregando" class="hidden relative size-4 text-neutral-100">
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(0deg); animation-delay: -1.1s;"><div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div></div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(30deg); animation-delay: -1.0s;"><div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div></div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(60deg); animation-delay: -0.9s;"><div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div></div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(90deg); animation-delay: -0.8s;"><div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div></div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(120deg); animation-delay: -0.7s;"><div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div></div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(150deg); animation-delay: -0.6s;"><div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div></div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(180deg); animation-delay: -0.5s;"><div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div></div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(210deg); animation-delay: -0.4s;"><div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div></div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(240deg); animation-delay: -0.3s;"><div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div></div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(270deg); animation-delay: -0.2s;"><div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div></div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(300deg); animation-delay: -0.1s;"><div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div></div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(330deg); animation-delay: 0.0s;"><div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div></div>
                  </div>
                </button>
              </form>

              <#if social?? && social.providers?? && social.providers?has_content>
                <div class="w-full flex items-center my-1">
                  <div class="w-full h-px bg-linear-to-r from-transparent via-stone-400 to-transparent dark:via-stone-700"
                  ></div>
                  <span class="mx-2 text-sm text-neutral-600 pointer-events-none dark:text-neutral-500">
                    ou
                  </span>
                  <div class="w-full h-px bg-linear-to-r from-transparent via-stone-400 to-transparent dark:via-stone-700"></div>
                </div>
                <div class="w-full flex flex-col gap-2">
                  <#list social.providers as provider>
                    <a id="social-${provider.alias}" href="${provider.loginUrl}" class="w-full h-9.5 cursor-pointer text-base flex justify-center items-center gap-2 rounded border border-stone-300 dark:border-stone-700 text-neutral-900 dark:text-neutral-100 not-dark:shadow font-medium transition-all duration-300 bg-stone-100 dark:bg-stone-800 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
                      <#if provider.alias?lower_case == "google">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="-3 0 262 262" preserveAspectRatio="xMidYMid">
                          <path
                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                            fill="#4285F4"
                          ></path>
                          <path
                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                            fill="#34A853"
                          ></path>
                          <path
                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                            fill="#FBBC05"
                          ></path>
                          <path
                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                            fill="#EB4335"
                          ></path>
                        </svg>
                      <#elseif provider.alias?lower_case == "github">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 .7a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.88.12 3.18a4.64 4.64 0 0 1 1.23 3.22c0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 .7"></path>
                        </svg>
                      </#if>
                      ${provider.displayName!provider.alias}
                    </a>
                  </#list>
                </div>
              </#if>

              <p class="text-xs text-neutral-600 dark:text-neutral-500">
                Já possui uma conta?
                <a href="${url.loginUrl}" class="font-medium text-primary/75 transition-all duration-300 underline underline-offset-2 rounded border border-transparent focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">Voltar pro login</a>.
              </p>

              <div class="my-1 w-full h-px bg-linear-to-r from-transparent via-stone-400 to-transparent dark:via-stone-700"></div>
              
              <p class="text-xs font-medium text-neutral-600 dark:text-neutral-500">
                As contas criadas aqui são para fins de interação com o autor
                deste website, especialmente por meio de comentários nas
                publicações, e podem ser excluídas facilmente a qualquer
                momento.
              </p>
              <p class="text-xs font-medium text-neutral-600 dark:text-neutral-500">
                Não armazenamos no banco mais que o necessário, como nome e
                e-mail, e não enviamos newsletters ou e-mails promocionais.
              </p>
              <div class="my-1 w-full h-px bg-linear-to-r from-transparent via-stone-400 to-transparent dark:via-stone-700"></div>
              <p class="text-xs font-medium text-neutral-600 dark:text-neutral-500">
                O código deste site está disponível no <a href="${properties['githubUrl']!'https://github.com/cirobtorres/blog'}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-primary/75 transition-all duration-300 underline underline-offset-2 rounded border border-transparent focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">GitHub<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg></a>.
              </p>

            </div>
          </div>
        </div>
      </div>

      <div class="hidden min-[700px]:block grayscale [background:linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,0.25)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')] dark:[background:linear-gradient(90deg,rgba(0,0,0,1),rgba(0,0,0,0.25)),radial-gradient(circle,rgba(0,0,0,0.0),rgba(0,0,0,1)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')]" />
      
    </main>

    <script>
      (() => {
        <#noparse>
          const form = document.getElementById("kc-register-form");
          const submitBtn = document.getElementById("kc-register-btn");
          const btnText = document.getElementById("btn-text");
          const spinner = document.getElementById("btn-spinner");
          
          const passwordInput = document.getElementById("password");
          const confirmInput = document.getElementById("password-confirm");
          const togglePasswordBtn = document.getElementById("btn-toggle-password");
          const generatePasswordBtn = document.getElementById("btn-generate-password");
          const copyPasswordBtn = document.getElementById("btn-copy-password");
          
          const eyeOpenIcon = document.getElementById("icon-eye-open");
          const eyeClosedIcon = document.getElementById("icon-eye-closed");
          const strengthText = document.getElementById("strength-text");
          const strengthBarFluid = document.getElementById("strength-bar-fluid");
          const strengthFeedback = document.getElementById("strength-feedback");

          // === zxcvbn dictionary ===
          const translations = {
            suggestions: {
              "Use a few words, go for less common words": "Use palavras menos comuns ou combine termos aleatórios",
              "No need for symbols, digits, or uppercase words": "Misturar palavras comuns não ajuda; tente frases mais longas",
              "Add another word or two. Uncommon words are better.": "Adicione mais uma ou duas palavras incomuns",
              "Capitalization doesn't help very much": "Letras maiúsculas usadas dessa maneira não ajudam muito",
              "All-lowercase is just as strong": "Palavras em minúsculo estruturadas são igualmente fortes",
              "Predictable substitutions like '@' instead of 'a' don't help very much": "Substituições óbvias como 'a' por '@' são facilmente adivinhadas",
              "Avoid dates and years that are associated with you": "Evite datas que estejam associadas a você",
              "Avoid sequences": "Evite sequências",
              "Avoid repeated words and characters": "Evite repetições de palavras e de caracteres"
            },
            warning: {
              "Straight rows of keys are easy to guess": "Sequências diretas do teclado são fáceis de adivinhar",
              "Short keyboard patterns are easy to guess": "Padrões curtos de digitação são fáceis de adivinhar",
              'Repeats like "aaa" are easy to guess': 'Repetições de caracteres como "aaa" são muito fáceis de adivinhar',
              'Sequences like "abc" are easy to guess': "Sequências como 'abc' ou sequências numéricas como '123' são muito previsíveis",
              "Recent years are easy to guess": "Anos recentes são fáceis de associar",
              "Dates are easy to guess": "Datas completas são fáceis de quebrar",
              "This is a top-10 common password": "Esta é uma das 10 senhas mais comuns do mundo",
              "This is a top-100 common password": "Esta é uma das 100 senhas mais comumente usadas",
              "This is a very common password": "Esta senha é extremamente comum",
              "This is similar to a commonly used password": "Esta estrutura é muito comum de usarem e portanto provável de ser descoberta",
              "A word by itself is easy to guess": "Uma palavra isolada é vulnerável",
              "Names and surnames by themselves are easy to guess": "Nomes e sobrenomes isolados são fáceis de deduzir",
              "Common names and surnames are easy to guess": "Nomes comuns são alvos fáceis de engenharia social",
              "Dates are often easy to guess": "Datas são muito óbvias e fáceis de serem adivinhadas",
              "Sequences like abc or 6543 are easy to guess": "Sequências como abc ou 123 são muito previsíveis e fáceis de se descobrir",
              "Reversed words aren't much harder to guess": "Palavras invertidas não são lá muito difíceis de se adivinhar",
              'Repeats like "abcabcabc" are only slightly harder to guess than "abc"': 'Repetições do tipo "abcabcabc" são apenas um pouquinho mais difícil de se adivinhar que "abc"'
            }
          };

          // 1. Pass visibility button
          togglePasswordBtn?.addEventListener("click", () => {
            const isPassword = passwordInput.type === "password";
            const start = passwordInput.selectionStart;
            const end = passwordInput.selectionEnd;

            passwordInput.type = isPassword ? "text" : "password";

            eyeOpenIcon.classList.toggle("hidden", isPassword);
            eyeClosedIcon.classList.toggle("hidden", !isPassword);

            passwordInput.focus();
            passwordInput.setSelectionRange(start, end);
          });

          // 2. Strong pass button
          generatePasswordBtn?.addEventListener("click", () => {
            const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
            const len = 16;
            let generated = "";
            const cryptoObj = window.crypto || window.msCrypto;
            if (cryptoObj) {
              const values = new Uint32Array(len);
              cryptoObj.getRandomValues(values);
              for (let i = 0; i < len; i++) {
                generated += chars[values[i] % chars.length];
              }
            } else {
              for (let i = 0; i < len; i++) {
                generated += chars.charAt(Math.floor(Math.random() * chars.length));
              }
            }

            passwordInput.type = "text";
            passwordInput.value = generated;

            if (confirmInput) confirmInput.value = generated;

            eyeOpenIcon.classList.add("hidden");
            eyeClosedIcon.classList.remove("hidden");
            
            passwordInput.dispatchEvent(new Event("input"));
            passwordInput.focus();
          });

          // 3. Copy to clipboard button
          copyPasswordBtn?.addEventListener("click", () => {
            if (!passwordInput.value) return;

            navigator.clipboard.writeText(passwordInput.value).then(() => {
              const iconDefault = document.getElementById("copyIconDefault");
              const iconCopied = document.getElementById("copyIconCopied");
              const textDefault = document.getElementById("copyTextDefault");
              const textCopied = document.getElementById("copyTextCopied");

              copyPasswordBtn.disabled = true;
              copyPasswordBtn.classList.remove("cursor-pointer", "text-neutral-900", "dark:text-neutral-100");
              copyPasswordBtn.classList.add("cursor-auto", "text-neutral-900", "dark:text-neutral-500", "bg-stone-100", "dark:bg-stone-750");

              if (iconDefault && iconCopied) {
                iconDefault.classList = "hidden size-4";
                iconCopied.classList = "block size-4";
              }

              if (textDefault && textCopied) {
                textDefault.classList = "truncate hidden";
                textCopied.classList = "truncate block";
              }

              setTimeout(() => {
                copyPasswordBtn.disabled = false;
                copyPasswordBtn.classList.add("cursor-pointer", "text-neutral-900", "dark:text-neutral-100");
                copyPasswordBtn.classList.remove("cursor-auto", "text-neutral-900", "dark:text-neutral-500", "bg-stone-100", "dark:bg-stone-750");

                if (iconDefault && iconCopied) {
                  iconDefault.classList = "block size-4";
                  iconCopied.classList = "hidden size-4";
                }

                if (textDefault && textCopied) {
                  textDefault.classList = "truncate block";
                  textCopied.classList = "truncate hidden";
                }
              }, 4000);
            });
          });

          // 4. Zxcvbn strength bar
          const updateStrength = () => {
            const val = passwordInput.value;

            if (!val) {
              // Permite que o required apresente o erro correspondente.
              passwordInput.setCustomValidity("");

              if (strengthBarFluid) {
                strengthBarFluid.style.width = "0%";
                strengthBarFluid.className =
                  "h-full transition-all duration-500 ease-out bg-transparent";
              }

              if (strengthText) {
                strengthText.textContent = "Senha não informada";
                strengthText.className =
                  "text-xs font-medium text-neutral-600 dark:text-neutral-500";
              }

              if (strengthFeedback) {
                strengthFeedback.innerHTML = "";
                strengthFeedback.classList.add("hidden");
                strengthFeedback.classList.remove("flex");
              }

              return;
            }

            let score = 0;
            let feedbackObj = {
              warning: "",
              suggestions: []
            };

            if (typeof zxcvbn === "function") {
              const analysis = zxcvbn(val);

              score = analysis.score;

              if (analysis.feedback) {
                feedbackObj.warning = analysis.feedback.warning || "";
                feedbackObj.suggestions =
                  analysis.feedback.suggestions || [];
              }
            } else {
              if (val.length >= 6) score = 1;
              if (val.length >= 10) score = 2;

              if (
                val.length >= 14 &&
                /[A-Z]/.test(val) &&
                /[0-9]/.test(val)
              ) {
                score = 4;
              }
            }

            // Integra a força da senha à validação padrão do formulário.
            if (score < 3) {
              passwordInput.setCustomValidity(
                "A senha deve ter força classificada como forte ou excelente."
              );
            } else {
              passwordInput.setCustomValidity("");
            }

            const configs = [
              {
                text: "Senha muito fraca",
                width: "15%",
                color: "bg-red-500",
                textClass: "text-red-500"
              },
              {
                text: "Senha fraca",
                width: "35%",
                color: "bg-orange-500",
                textClass: "text-orange-500"
              },
              {
                text: "Senha razoável",
                width: "55%",
                color: "bg-yellow-500",
                textClass: "text-yellow-500"
              },
              {
                text: "Senha forte",
                width: "80%",
                color: "bg-emerald-500",
                textClass: "text-emerald-500"
              },
              {
                text: "Senha excelente",
                width: "100%",
                color: "bg-blue-500",
                textClass: "text-blue-500"
              }
            ];

            const current = configs[score];

            if (strengthText) {
              strengthText.textContent = current.text;
              strengthText.className =
                `text-xs font-semibold ${current.textClass}`;
            }

            if (strengthBarFluid) {
              strengthBarFluid.className =
                `h-full transition-all duration-500 ease-out ${current.color}`;

              strengthBarFluid.style.width = current.width;
            }

            if (strengthFeedback) {
              strengthFeedback.innerHTML = "";

              const elements = [];

              if (feedbackObj.warning) {
                const translatedWarning =
                  translations.warning[feedbackObj.warning] ||
                  feedbackObj.warning;

                elements.push(
                  `<span class="text-red-500 dark:text-red-400 font-medium">${translatedWarning}</span>`
                );
              }

              feedbackObj.suggestions.forEach((suggestion) => {
                const translatedSuggestion =
                  translations.suggestions[suggestion] ||
                  suggestion;

                elements.push(`<span>${translatedSuggestion}</span>`);
              });

              if (elements.length > 0) {
                strengthFeedback.innerHTML = elements.join("");
                strengthFeedback.classList.remove("hidden");
                strengthFeedback.classList.add("flex");
              } else {
                strengthFeedback.classList.add("hidden");
                strengthFeedback.classList.remove("flex");
              }
            }
          };

          passwordInput?.addEventListener("input", updateStrength);

          // 5. Submit
          form?.addEventListener("submit", () => {
            // O evento submit só ocorre depois que o navegador
            // aprova as validações de todos os campos.
            if (confirmInput && passwordInput) {
              confirmInput.value = passwordInput.value;
            }

            if (submitBtn) {
              submitBtn.disabled = true;
            }

            if (btnText) {
              btnText.textContent = "Cadastrando";
            }

            if (spinner) {
              spinner.classList.remove("hidden");
            }
          });
        </#noparse>
      })();
    </script>
  </body>
</html>
