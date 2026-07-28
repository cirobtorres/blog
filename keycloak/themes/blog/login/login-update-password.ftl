<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${msg("updatePasswordTitle")}</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/tailwind.css">
  </head>
  <body class="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased h-screen">
    <main class="h-full min-h-screen">
      <div class="w-full h-full min-h-screen not-dark:shadow min-[700px]:border-r border-neutral-200 dark:border-neutral-800">
        <div class="h-screen p-1">
          <div class="h-full p-8 overflow-y-auto flex flex-col justify-center">
            <div class="max-w-125 w-full mx-auto flex flex-col justify-center gap-2">
              <div class="flex flex-col gap-2">
                <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  ${msg("updatePasswordTitle")}
                </h1>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  ${msg("resetPasswordMessage")}
                </p>
              </div>
              <hr class="border-neutral-200 dark:border-neutral-800" />
              <#if message?? && message.summary??>
                <div class="w-full px-2 py-1 rounded border border-destructive/75 dark:border-destructive/50 bg-linear-to-r from-destructive/20 to-transparent">
                  <p class="text-destructive dark:text-neutral-100">
                    ${message.summary}
                  </p>
                </div>
              </#if>
              <form id="kc-passwd-update-form" action="${url.loginAction}" method="post" class="flex flex-col gap-2">
                <div class="relative w-full rounded not-dark:shadow"> 
                  <input id="password-new" name="password-new" type="password" autocomplete="new-password" autofocus placeholder="" class="h-full w-full px-2 pt-4.25 pb-1 text-xs font-medium rounded peer transition-all duration-300 placeholder:text-transparent placeholder:select-none border peer text-neutral-900 dark:text-neutral-400 focus:placeholder:text-neutral-500 focus-within:bg-stone-600 dark:focus-within:bg-stone-750 focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary 
                  <#if messagesPerField.existsError('password')>
                    bg-destructive/10 border-destructive/75 dark:border-destructive/50 hover:border-destructive/85 dark:hover:border-destructive/60
                  <#else>
                    bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-150 dark:hover:bg-stone-750
                  </#if>">
                  <label for="password-new" class="absolute origin-left top-1/2 z-10 inset-s-1 px-1.5 font-medium select-none text-sm pointer-events-none bg-transparent bg-opacity-50 transform transition-top duration-100 -translate-y-4.5 peer-focus:-translate-y-4.5 peer-placeholder-shown:-translate-y-1/2 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 text-neutral-900 peer-focus:text-neutral-900 peer-placeholder-shown:text-neutral-900 dark:text-neutral-100 dark:peer-focus:text-neutral-100 dark:peer-placeholder-shown:text-neutral-100">
                    ${msg("passwordNew")}
                  </label>
                  <button id="toggle-password-new" type="button" aria-label="Mostrar senha" aria-controls="password-new" aria-pressed="false" class="absolute top-1/2 -translate-y-1/2 right-1.25 size-7 cursor-pointer flex items-center justify-center not-dark:shadow transition-all duration-300 border rounded dark:border-stone-700 text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-stone-800 dark:hover:border-stone-650 dark:hover:bg-stone-750 dark:focus-visible:bg-stone-750 focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
                    <svg class="eye-open" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <svg class="eye-closed" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" hidden>
                      <path d="m2 2 20 20"></path>
                      <path d="M6.71 6.71C4.9 7.91 3.5 9.73 2.75 12c1.47 4.4 5.06 7 9.25 7 1.18 0 2.3-.2 3.33-.58"></path>
                      <path d="M10.73 5.08A9.8 9.8 0 0 1 12 5c4.19 0 7.78 2.6 9.25 7a11.2 11.2 0 0 1-2.08 3.37"></path>
                      <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88"></path>
                    </svg>
                  </button>
                </div>
                <#if messagesPerField.existsError("password")>
                  <p class="text-xs font-medium text-red-500">
                    ${kcSanitize(messagesPerField.get("password"))?no_esc}
                  </p>
                </#if>
                <div class="relative w-full rounded not-dark:shadow"> 
                  <input id="password-confirm" name="password-confirm" type="password" autocomplete="new-password" placeholder=" " class="h-full w-full px-2 pt-4.25 pb-1 text-xs font-medium rounded peer transition-all duration-300 placeholder:text-transparent placeholder:select-none border peer text-neutral-900 dark:text-neutral-400 focus:placeholder:text-neutral-500 focus-within:bg-stone-stone-600 dark:focus-within:bg-stone-stone-750 focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary 
                  <#if messagesPerField.existsError('password-confirm')>
                    bg-destructive/10 border-destructive/75 dark:border-destructive/50 hover:border-destructive/85 dark:hover:border-destructive/60
                  <#else>
                    bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-150 dark:hover:bg-stone-750
                  </#if>">
                  <label for="password-confirm" class="absolute origin-left top-1/2 z-10 inset-s-1 px-1.5 font-medium select-none text-sm pointer-events-none bg-transparent bg-opacity-50 transform transition-top duration-100 -translate-y-4.5 peer-focus:-translate-y-4.5 peer-placeholder-shown:-translate-y-1/2 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 text-neutral-900 peer-focus:text-neutral-900 peer-placeholder-shown:text-neutral-900 dark:text-neutral-100 dark:peer-focus:text-neutral-100 dark:peer-placeholder-shown:text-neutral-100">
                    ${msg("passwordConfirm")}
                  </label>
                  <button id="toggle-password-confirm" type="button" aria-label="Mostrar confirmação de senha" aria-controls="password-confirm" aria-pressed="false" class="absolute top-1/2 -translate-y-1/2 right-1.25 size-7 cursor-pointer flex items-center justify-center not-dark:shadow transition-all duration-300 border rounded dark:border-stone-700 text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-stone-800 dark:hover:border-stone-650 dark:hover:bg-stone-750 dark:focus-visible:bg-stone-750 focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
                    <svg class="eye-open" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <svg class="eye-closed" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" hidden>
                      <path d="m2 2 20 20"></path>
                      <path d="M6.71 6.71C4.9 7.91 3.5 9.73 2.75 12c1.47 4.4 5.06 7 9.25 7 1.18 0 2.3-.2 3.33-.58"></path>
                      <path d="M10.73 5.08A9.8 9.8 0 0 1 12 5c4.19 0 7.78 2.6 9.25 7a11.2 11.2 0 0 1-2.08 3.37"></path>
                      <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88"></path>
                    </svg>
                  </button>
                </div>
                <#if messagesPerField.existsError("password-confirm")>
                  <p class="text-xs font-medium text-red-500">
                    ${kcSanitize(messagesPerField.get("password-confirm"))?no_esc}
                  </p>
                </#if>
                <#if isAppInitiatedAction??>
                  <label for="logout-sessions" class="relative cursor-pointer select-none flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-500">
                    <input id="logout-sessions" name="logout-sessions" type="checkbox" value="on" class="peer sr-only">
                    <div class="size-4 flex items-center justify-center rounded border border-stone-300 dark:border-stone-700 bg-stone-200 dark:bg-stone-800 text-transparent transition-all duration-300 peer-checked:bg-primary dark:peer-checked:bg-primary peer-checked:border-primary dark:peer-checked:border-primary peer-checked:text-neutral-100 peer-focus-visible:outline-none peer-focus-visible:ring-3 dark:peer-focus-visible:ring-2 peer-focus-visible:ring-stone-900/25 dark:peer-focus-visible:ring-stone-100 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-stone-950 dark:peer-focus-visible:ring-offset-stone-950 peer-focus-visible:border-primary dark:peer-focus-visible:border-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>${msg("logoutOtherSessions")}</span>
                  </label>
                </#if>
                <button id="submit-btn" type="submit" class="w-full h-9.5 flex justify-center items-center gap-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-sm text-neutral-100 font-medium not-dark:shadow rounded border border-primary bg-primary/75 hover:bg-primary/90 transition-all duration-300 focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
                  <span id="confirm-button-text">${msg("doSubmit")}</span>
                  <div id="btn-spinner" role="status" aria-label="Carregando" class="hidden relative size-5 text-neutral-100">
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
            </div>
          </div>
        </div>
      </div>
      <div class="hidden min-[700px]:block grayscale flex justify-center items-center [background:linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,0.25)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')] dark:[background:linear-gradient(90deg,rgba(0,0,0,1),rgba(0,0,0,0.25)),radial-gradient(circle,rgba(0,0,0,0.0),rgba(0,0,0,1)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')]" />
    </main>
    <script>
      (() => {
        const setupPasswordToggle = (inputId, buttonId) => {
          const input = document.getElementById(inputId);
          const button = document.getElementById(buttonId);
          if (!input || !button) return;

          const eyeOpen = button.querySelector(".eye-open");
          const eyeClosed = button.querySelector(".eye-closed");

          button.addEventListener("click", () => {
            const isShowing = input.type === "text";
            input.type = isShowing ? "password" : "text";

            button.setAttribute("aria-label", isShowing ? "Mostrar senha" : "Ocultar senha");
            button.setAttribute("aria-pressed", isShowing ? "false" : "true");

            if (isShowing) {
              eyeOpen?.removeAttribute("hidden");
              eyeClosed?.setAttribute("hidden", "");
            } else {
              eyeOpen?.setAttribute("hidden", "");
              eyeClosed?.removeAttribute("hidden");
            }

            input.focus();
            const val = input.value;
            input.value = "";
            input.value = val;
          });
        };

        setupPasswordToggle("password-new", "toggle-password-new");
        setupPasswordToggle("password-confirm", "toggle-password-confirm");
        
        const submitBtn = document.getElementById("submit-btn");
        const buttonText = document.getElementById("confirm-button-text");
        const spinner = document.getElementById("btn-spinner");

        const form = document.getElementById("kc-passwd-update-form");

        form?.addEventListener("submit", () => {
          if (submitBtn) {
            submitBtn.disabled = true;
          }
          if (buttonText) {
            buttonText.textContent = "Carregando...";
          }
          if (spinner) {
            spinner.classList.remove("hidden");
          }
        });

      })();
    </script>
  </body>
</html>