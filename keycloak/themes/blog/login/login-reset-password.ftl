<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinir senha</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/tailwind.css">
  </head>
  <body class="w-full min-h-screen flex justify-center items-center not-dark:shadow bg-stone-100 dark:bg-stone-925"><!--bg-stone-150 dark:bg-stone-950-->
    <main class="w-full">
      <section class="w-full max-w-120 mx-auto px-4 sm:px-8 py-8 flex flex-col items-center justify-center gap-2">
        <h1 class="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Redefinir senha</h1>
        <p class="text-neutral-900 dark:text-neutral-400">
          Informe seu usuário ou e-mail. Enviaremos um link para redefinição de senha.
        </p>
        <#if message?has_content>
          <div class="w-full px-2 py-1 rounded border border-destructive/75 dark:border-destructive/50 bg-linear-to-r from-destructive/20 to-transparent">
            <p class="text-destructive dark:text-neutral-100">${message.summary}</p>
          </div>
        </#if>
        <form id="kc-reset-password-form" action="${url.loginAction}" method="post" class="w-full flex flex-col items-center justify-center gap-2">
          <div class="relative w-full rounded not-dark:shadow">
            <input id="username" name="username" type="text" value="${(auth.attemptedUsername!'')}" autocomplete="username" placeholder="" autofocus spellcheck="false" class="h-full w-full px-2 pt-4.25 pb-1 text-xs font-medium rounded peer transition-all duration-300 placeholder:text-transparent placeholder:select-none border peer text-neutral-900 dark:text-neutral-400 focus:placeholder:text-neutral-500 focus-within:bg-stone-stone-600 dark:focus-within:bg-stone-stone-750 focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-150 dark:hover:bg-stone-750">
            <label for="username" class="absolute origin-left top-1/2 z-10 inset-s-1 px-1.5 font-medium select-none text-sm pointer-events-none bg-transparent bg-opacity-50 transform transition-top duration-100 -translate-y-4.5 peer-focus:-translate-y-4.5 peer-placeholder-shown:-translate-y-1/2 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 text-neutral-900 peer-focus:text-neutral-900 peer-placeholder-shown:text-neutral-900 dark:text-neutral-100 dark:peer-focus:text-neutral-100 dark:peer-placeholder-shown:text-neutral-100">
              <#if !realm.loginWithEmailAllowed>
                Usuário
              <#else>
                Usuário ou e-mail
              </#if>
            </label>
          </div>
          <button id="submit-btn" type="submit" class="w-full h-9.5 flex justify-center items-center gap-1 cursor-pointer disabled:cursor-auto disabled:opacity-50 text-sm text-neutral-100 font-medium not-dark:shadow rounded border border-primary bg-primary/75 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
            <span id="confirm-button-text">
              Enviar link
            </span>
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
        <p>
          <a href="${url.loginUrl}" class="text-primary/75 hover:text-primary dark:hover:text-primary transition-all duration-300 underline underline-offset-2 rounded border border-transparent focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
            Voltar para login
          </a>
        </p>
      </section>
    </main>
    <script>
      (() => {
        const submitBtn = document.getElementById("submit-btn");
        const buttonText = document.getElementById("confirm-button-text");
        const spinner = document.getElementById("btn-spinner");

        const form = document.getElementById("kc-reset-password-form");

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