<#setting url_escaping_charset="UTF-8">

<!DOCTYPE html>
<html lang="${locale.currentLanguageTag!'pt-BR'}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex,nofollow">
    <title>Login</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/tailwind.css">
  </head>
  <body class="min-h-screen antialiased bg-stone-100 dark:bg-stone-925">
    <main class="min-h-screen grid min-[700px]:grid-cols-[1fr_700px]">
      <div aria-hidden="true" class="hidden min-[700px]:flex justify-center items-center grayscale bg-cover bg-center [background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,1)),url('https://store-images.s-microsoft.com/image/apps.20650.14336626908214534.584cecb6-3f58-4dd3-9758-900c83416f32.aacd9cd9-55fe-43b1-a452-49dad64f4772')] dark:[background:linear-gradient(90deg,rgba(0,0,0,0.25),rgba(0,0,0,1)),radial-gradient(circle,rgba(0,0,0,0),rgba(0,0,0,1)),url('https://store-images.s-microsoft.com/image/apps.20650.14336626908214534.584cecb6-3f58-4dd3-9758-900c83416f32.aacd9cd9-55fe-43b1-a452-49dad64f4772')]"></div>
      <div class="w-full min-h-screen min-[700px]:border-l not-dark:shadow bg-stone-100 dark:bg-stone-925 border-stone-300 dark:border-stone-700">
        <div class="h-screen p-1">
          <div class="h-full p-8 overflow-y-auto scrollbar">
            <div class="w-full max-w-125 min-h-full mx-auto flex flex-col justify-center gap-2">
              <a href="${properties['homeUrl']!'http://localhost:3000/'}" class="ml-0 mr-auto mb-4 text-sm font-medium text-primary/75 underline underline-offset-2 transition-all duration-300 rounded border border-transparent focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
                Home
              </a>
              <div class="mb-8">
                <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  Login
                </h1>
              </div>
              <#if message?has_content>
                <#assign messageType = message.type!"info">
                <#if messageType == "success">
                  <#assign alertClasses = "text-success dark:text-neutral-100 border-success/75 dark:border-success/50 bg-linear-to-r from-success/20 to-transparent">
                <#elseif messageType == "warning">
                  <#assign alertClasses = "text-warning dark:text-neutral-100 border-warning/75 dark:border-warning/50 bg-linear-to-r from-warning/20 to-transparent">
                <#elseif messageType == "error">
                  <#assign alertClasses = "text-destructive dark:text-neutral-100 border-destructive/75 dark:border-destructive/50 bg-linear-to-r from-destructive/20 to-transparent">
                <#else>
                  <#assign alertClasses = "text-informative dark:text-neutral-100 border-informative/75 dark:border-informative/50 bg-linear-to-r from-informative/20 to-transparent">
                </#if>
                <div role="alert" aria-live="polite" class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 rounded border p-4 text-sm ${alertClasses}">
                  <#if messageType == "success">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  <#else>
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                  </#if>
                  <div class="col-start-2">
                    ${kcSanitize(message.summary)?no_esc}
                  </div>
                </div>
              </#if>
              <form id="kc-form-login" action="${url.loginAction}" method="post" class="w-full flex flex-col justify-center gap-2">

                <div class="relative w-full rounded not-dark:shadow">

                  <input id="username" name="username" placeholder="" type="text" value="${(login.username!'')}" required autocomplete="username" autocapitalize="none" spellcheck="false" autofocus aria-invalid="<#if messagesPerField.existsError('username','password')>true<#else>false</#if>" class="h-full w-full px-2 pt-4.25 pb-1 text-xs font-medium rounded peer transition-all duration-300 placeholder:text-transparent placeholder:select-none border text-neutral-900 dark:text-neutral-400 focus:placeholder:text-neutral-500 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 <#if messagesPerField.existsError('username','password')>bg-destructive/10 border-destructive/75 dark:border-destructive/50 focus-visible:bg-destructive/15 dark:focus-visible:bg-destructive/15 focus-visible:border-destructive/75 dark:focus-visible:border-destructive/50<#else>bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 focus-visible:border-primary dark:focus-visible:border-primary</#if>">

                  <label for="username" class="absolute origin-left top-1/2 z-10 inset-s-1 px-1.5 font-medium select-none text-sm pointer-events-none bg-transparent bg-opacity-50 transform transition-top duration-100 -translate-y-4.5 peer-focus:-translate-y-4.5 peer-placeholder-shown:-translate-y-1/2 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 text-neutral-900 peer-focus:text-neutral-900 peer-placeholder-shown:text-neutral-900 dark:text-neutral-100 dark:peer-focus:text-neutral-100 dark:peer-placeholder-shown:text-neutral-100">
                    <#if !realm.loginWithEmailAllowed>
                      Usuário
                    <#elseif !realm.registrationEmailAsUsername>
                      Usuário ou e-mail
                    <#else>
                      E-mail
                    </#if>
                  </label>

                </div>

                <#if messagesPerField.existsError('username','password')>
                  <span role="alert" class="mx-2 text-xs font-medium text-destructive">
                    E-mail ou senha incorretos.
                  </span>
                </#if>

                <div class="relative w-full rounded not-dark:shadow">

                  <input id="password" name="password" type="password" placeholder="" autocomplete="current-password" minlength="8" required aria-invalid="<#if messagesPerField.existsError('username','password')>true<#else>false</#if>" class="h-full w-full px-2 pt-4.25 pb-1 text-xs font-medium rounded peer transition-all duration-300 placeholder:text-transparent placeholder:select-none border text-neutral-900 dark:text-neutral-400 focus:placeholder:text-neutral-500 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 <#if messagesPerField.existsError('username','password')>bg-destructive/10 border-destructive/75 dark:border-destructive/50 focus-visible:bg-destructive/15 dark:focus-visible:bg-destructive/15 focus-visible:border-destructive/75 dark:focus-visible:border-destructive/50<#else>bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 focus-visible:border-primary dark:focus-visible:border-primary</#if>">

                  <label for="password" class="absolute origin-left top-1/2 z-10 inset-s-1 px-1.5 font-medium select-none text-sm pointer-events-none bg-transparent bg-opacity-50 transform transition-top duration-100 -translate-y-4.5 peer-focus:-translate-y-4.5 peer-placeholder-shown:-translate-y-1/2 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 text-neutral-900 peer-focus:text-neutral-900 peer-placeholder-shown:text-neutral-900 dark:text-neutral-100 dark:peer-focus:text-neutral-100 dark:peer-placeholder-shown:text-neutral-100">
                    Senha
                  </label>

                  <button id="toggle-password" type="button" aria-label="Mostrar senha" aria-controls="password" aria-pressed="false" class="absolute top-1/2 -translate-y-1/2 right-1.25 size-7 cursor-pointer flex items-center justify-center not-dark:shadow transition-all duration-300 border rounded border-stone-300 dark:border-stone-700 text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-stone-800 dark:focus-visible:bg-stone-750 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
                    <svg id="password-eye-open" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <svg id="password-eye-closed" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" hidden>
                      <path d="m2 2 20 20"></path>
                      <path d="M6.71 6.71C4.9 7.91 3.5 9.73 2.75 12c1.47 4.4 5.06 7 9.25 7 1.18 0 2.3-.2 3.33-.58"></path>
                      <path d="M10.73 5.08A9.8 9.8 0 0 1 12 5c4.19 0 7.78 2.6 9.25 7a11.2 11.2 0 0 1-2.08 3.37"></path>
                      <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88"></path>
                    </svg>
                  </button>

                </div>

                <#if messagesPerField.existsError('username','password')>
                  <span role="alert" class="mx-2 text-xs font-medium text-destructive">
                    E-mail ou senha incorretos.
                  </span>
                </#if>

                <#if realm.rememberMe && !usernameEditDisabled??>
                  <label for="rememberMe" class="relative cursor-pointer select-none flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-500">
                    <input id="rememberMe" name="rememberMe" type="checkbox" <#if login.rememberMe??>checked</#if> class="peer sr-only">
                    <div class="size-4 flex items-center justify-center rounded border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-transparent transition-all duration-300 peer-checked:bg-primary dark:peer-checked:bg-primary peer-checked:border-primary dark:peer-checked:border-primary peer-checked:text-neutral-100 peer-focus-visible:outline-none dark:peer-focus-visible:outline-none peer-focus-visible:ring-2 dark:peer-focus-visible:ring-2 peer-focus-visible:ring-primary dark:peer-focus-visible:ring-stone-100 dark:peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-stone-950 dark:peer-focus-visible:ring-offset-stone-950 peer-focus-visible:border-primary dark:peer-focus-visible:border-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>Permanecer conectado</span>
                  </label>
                </#if>

                <button id="kc-login" name="login" type="submit" class="w-full h-9.5 flex justify-center items-center gap-1 cursor-pointer disabled:cursor-auto disabled:opacity-50 text-sm text-neutral-100 font-medium not-dark:shadow rounded border border-primary bg-primary/75 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
                  <span id="confirm-button-text">
                    Confirmar
                  </span>
                  <div id="btn-spinner" role="status" aria-label="Carregando" class="hidden relative size-4 text-neutral-100">
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(0deg); animation-delay: -1.1s;">
                      <div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(30deg); animation-delay: -1.0s;">
                      <div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(60deg); animation-delay: -0.9s;">
                      <div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(90deg); animation-delay: -0.8s;">
                      <div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(120deg); animation-delay: -0.7s;">
                      <div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(150deg); animation-delay: -0.6s;">
                      <div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(180deg); animation-delay: -0.5s;">
                      <div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(210deg); animation-delay: -0.4s;">
                      <div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(240deg); animation-delay: -0.3s;">
                      <div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(270deg); animation-delay: -0.2s;">
                      <div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(300deg); animation-delay: -0.1s;">
                      <div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full animate-spinner-fade" style="transform: rotate(330deg); animation-delay: 0.0s;">
                      <div class="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full"></div>
                    </div>
                  </div>
                </button>

              </form>

              <#if realm.resetPasswordAllowed>
                <a href="${url.loginResetCredentialsUrl}" class="mx-auto text-xs text-primary/75 underline underline-offset-2 rounded border border-transparent transition-all duration-300 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
                  Esqueci minha senha
                </a>
              </#if>
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
                    <a id="social-${provider.alias}" href="${provider.loginUrl}" class="w-full h-9.5 cursor-pointer text-base flex justify-center items-center gap-2 rounded border border-stone-300 dark:border-stone-700 text-neutral-900 dark:text-neutral-100 shadow font-medium transition-all duration-300 bg-stone-100 not-dark:shadow dark:bg-stone-800 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
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
              <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
                <p class="text-xs font-medium text-neutral-600 dark:text-neutral-500">
                  Para se cadastrar, clique
                  <a href="${url.registrationUrl}" class="text-primary/75 transition-all duration-300 underline underline-offset-2 rounded border border-transparent focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">aqui</a>.
                </p>
              </#if>
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
    </main>

    <script>
      (() => {
        const form = document.getElementById("kc-form-login");
        const submitBtn = document.getElementById("kc-login");
        const buttonText = document.getElementById("confirm-button-text");
        const spinner = document.getElementById("btn-spinner");

        const passwordInput = document.getElementById("password");
        const togglePassword = document.getElementById("toggle-password");
        const eyeOpen = document.getElementById("password-eye-open");
        const eyeClosed = document.getElementById("password-eye-closed");

        togglePassword?.addEventListener("click", () => {
          const showingPassword = passwordInput.type === "text";
          
          passwordInput.type = showingPassword ? "password" : "text";

          togglePassword.setAttribute(
            "aria-label",
            showingPassword ? "Mostrar senha" : "Ocultar senha"
          );
          togglePassword.setAttribute(
            "aria-pressed",
            showingPassword ? "false" : "true"
          );

          eyeOpen.hidden = !showingPassword;
          eyeClosed.hidden = showingPassword;

          passwordInput.focus();
          
          const val = passwordInput.value;
          passwordInput.value = "";
          passwordInput.value = val;
        });

        form?.addEventListener("submit", () => {
          if (submitBtn) {
            submitBtn.disabled = true;
          }
          if (buttonText) {
            buttonText.textContent = "Carregando";
          }
          if (spinner) {
            spinner.classList.remove("hidden");
          }
        });
      })();
    </script>
    
  </body>
</html>