<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificar E-mail</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/tailwind.css">
  </head>
  <body class="min-h-screen overflow-hidden antialiased bg-stone-100 dark:bg-stone-925">
    <main class="w-full h-full max-w-125 mx-auto z-10 not-dark:shadow">
      <div class="w-full h-full p-8 overflow-y-auto scrollbar flex flex-col justify-center items-center gap-4">
        <a href="${properties['homeUrl']!'http://localhost:3000'}" class="ml-0 mr-auto mb-4 text-sm text-primary/75 dark:text-primary/75 font-medium underline underline-offset-2 hover:text-primary dark:hover:text-primary transition-all duration-300 rounded border border-transparent focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
          Home
        </a>
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Confirmar E-mail</h1>
          <p class="text-neutral-600 dark:text-neutral-400 antialiased">
              Quase pronto! Precisamos apenas validar o seu endereço de e-mail.
          </p>
        </div>
        <hr class="w-full border-neutral-300 dark:border-neutral-700" />
        <div class="w-full p-4 border rounded-lg text-destructive dark:text-neutral-100 border-destructive/75 dark:border-destructive/50 bg-linear-to-r from-destructive/20 to-transparent">
          <span class="font-bold block mb-1">Ação Requerida</span>
          <#if message?? && message.summary??>
              ${message.summary}
          <#else>
              Por favor, clique no botão abaixo para prosseguir com a ativação da sua conta.
          </#if>
        </div>  
        <#if actionUri??>
          <a href="${actionUri}" class="w-full h-9.5 cursor-pointer disabled:cursor-auto disabled:opacity-50 flex items-center justify-center text-sm text-neutral-100 font-medium not-dark:shadow rounded border border-primary bg-primary/75 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
              Confirmar
          </a>
        <#else>
          <a href="${url.loginUrl}" class="text-primary/75 dark:text-primary/75 underline font-bold hover:text-primary transition-colors duration-300 rounded border border-transparent focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
              Voltar para Login
          </a>
        </#if>
        <hr class="w-full border-neutral-300 dark:border-neutral-700" />
        <p class="text-xs font-medium text-neutral-600 dark:text-neutral-500 antialiased">
            Se o botão não funcionar, certifique-se de estar utilizando o link enviado recentemente.
        </p>
      </div>
    </main>
  </body>
</html>
