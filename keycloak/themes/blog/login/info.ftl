<!DOCTYPE html>
<html lang="pt-BR">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verificar E-mail</title>
      <link rel="stylesheet" href="${url.resourcesPath}/css/login.css">
      <link rel="stylesheet" href="${url.resourcesPath}/css/tailwind.css">
  </head>
  <body class="relative h-screen w-screen grid grid-cols-1 overflow-hidden antialiased bg-stone-100 dark:bg-stone-950">
    <main class="z-10 col-start-1 row-start-1 w-full h-full max-w-125 min-h-screen mx-auto not-dark:shadow border-x-none min-[500px]:border-x border-stone-200 dark:border-stone-700 bg-stone-150 dark:bg-stone-900">
      <div class="w-full h-full p-8 overflow-y-auto scrollbar flex flex-col justify-center items-center gap-4">
        <a
          href="${properties['homeUrl']!'http://localhost:3000'}"
          className="ml-0 mr-auto w-fit text-sm inline-flex rounded transition-all duration-300 focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 no-underline ml-0 mr-auto"
        >
          Home
        </a>
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Confirmar E-mail</h1>
          <p class="text-neutral-600 dark:text-neutral-400 antialiased">
              Quase pronto! Precisamos apenas validar o seu endereço de e-mail.
          </p>
        </div>
        <hr class="w-full border-neutral-300 dark:border-neutral-700" />
        <div class="w-full p-4 rounded-lg bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900 text-sm text-violet-800 dark:text-violet-300">
          <span class="font-bold block mb-1">Ação Requerida</span>
          <#if message?? && message.summary??>
              ${message.summary}
          <#else>
              Por favor, clique no botão abaixo para prosseguir com a ativação da sua conta.
          </#if>
        </div>  
        <#if actionUri??>
          <a href="${actionUri}" class="w-full h-9.5 text-neutral-100 bg-primary/65 border border-primary font-medium flex items-center justify-center rounded transition-all shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Confirmar
          </a>
        <#else>
          <a href="${properties['signInUrl']!'http://localhost:3000/users/sign-in'}" class="text-primary underline font-bold hover:text-primary-hover transition-colors duration-300">
              Voltar para Login
          </a>
        </#if>
        <hr class="w-full border-neutral-300 dark:border-neutral-700" />
        <p class="text-xs font-medium text-neutral-600 dark:text-neutral-500 antialiased">
            Se o botão não funcionar, certifique-se de estar utilizando o link enviado recentemente.
        </p>
      </div>
    </main>
    <div class="min-[500px]:block hidden absolute inset-0 m-auto min-h-full min-w-full bg-cover bg-center grayscale [background:linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,0.25)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')] dark:[background:linear-gradient(90deg,rgba(0,0,0,1),rgba(0,0,0,0.25)),radial-gradient(circle,rgba(0,0,0,0.0),rgba(0,0,0,1)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')]" />
  </body>
</html>
