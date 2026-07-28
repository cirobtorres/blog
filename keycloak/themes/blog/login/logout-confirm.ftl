<#setting url_escaping_charset="UTF-8">

<!DOCTYPE html>
<html lang="${locale.currentLanguageTag!'pt-BR'}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex,nofollow">
    <title>${msg("logoutConfirmTitle")}</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/tailwind.css">
  </head>
  <body class="w-full h-screen antialiased text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-neutral-950">
    <main class="w-full h-full mx-auto p-8 overflow-y-auto scrollbar flex flex-col justify-center items-center gap-2">

      <#if message?has_content>
        <#assign messageType = message.type!"info">
        <div role="alert" aria-live="polite" class="flex gap-2 px-2 py-1 rounded-lg border text-destructive dark:text-neutral-100 border-destructive/75 dark:border-destructive/50 bg-linear-to-r from-destructive/20 to-transparent">
          <#if messageType == "success">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          <#else>
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          </#if>
          <div class="text-sm">
            ${kcSanitize(message.summary)?no_esc}
          </div>
        </div>
      </#if>

      <h1 class="text-3xl font-bold">
        ${msg("logoutConfirmTitle")}
      </h1>

      <p class="text-base text-neutral-600 dark:text-neutral-400">
        ${msg("logoutConfirmHeader")}
      </p>

      <form id="kc-logout-confirm" action="${url.logoutConfirmAction}" method="post" class="">
  
        <#if logout?? && logout.sessionCode??>
          <input type="hidden" name="session_code" value="${logout.sessionCode}">
        </#if>

        <button id="kc-logout" name="accept" type="submit" class="cursor-pointer font-medium text-primary/75 hover:text-primary dark:hover:text-primary transition-all duration-300 underline underline-offset-2 rounded border border-transparent focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
          <span id="confirm-button-text">
            ${msg("doYes")}
          </span>
          <div id="btn-spinner" role="status" aria-label="Carregando" class="hidden relative">
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

        <#if logout?? && logout.logoutRedirectUri?has_content>
          <a href="${logout.logoutRedirectUri}" class="cursor-pointer text-neutral-900 dark:text-neutral-100 transition-all duration-300 rounded border border-transparent focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
            ${msg("doNo")}
          </a>
        <#else>
          <a href="http://localhost:3000" class="cursor-pointer text-neutral-900 dark:text-neutral-100 transition-all duration-300 rounded border border-transparent focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
            ${msg("doNo")}
          </a>
        </#if>

      </form>

    </main>

    <script>
      (() => {
        const form = document.getElementById("kc-logout-confirm");
        const submitBtn = document.getElementById("kc-logout");
        const buttonText = document.getElementById("confirm-button-text");
        const spinner = document.getElementById("btn-spinner");

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