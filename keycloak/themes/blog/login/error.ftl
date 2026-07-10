<!DOCTYPE html>
<html lang="pt-BR">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Revisar Perfil</title>
      <link rel="stylesheet" href="${url.resourcesPath}/css/login.css">
      <link rel="stylesheet" href="${url.resourcesPath}/css/tailwind.css">
  </head>
  <body class="relative h-screen w-screen grid grid-cols-1 overflow-hidden antialiased bg-stone-100 dark:bg-stone-950">
    <main class="z-10 col-start-1 row-start-1 w-full h-full max-w-125 min-h-screen mx-auto not-dark:shadow border-x-none min-[500px]:border-x border-stone-200 dark:border-stone-700 bg-stone-150 dark:bg-stone-900">
      <div class="w-full h-full p-8 overflow-y-auto scrollbar flex flex-col justify-center items-center gap-4">
        <#if message.summary?contains("expired")>
          <h1 class="text-center text-2xl font-bold text-neutral-900 dark:text-neutral-100">Os 🍪 de navegação não foram encontrados!</h1>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">Os cookies possivelmente estão expirados; podem ainda ter sido deletados ou estarem desativados no seu navegador. Volte para o login e tente novamente.</p>
          <a href="${properties['signInUrl']!'http://localhost:3000/users/sign-in'}" class="text-primary underline font-bold hover:text-primary-hover transition-colors duration-300">Voltar para Login</a>
          <a href="${properties['homeUrl']!'http://localhost:3000'}" class="text-neutral-900 dark:text-neutral-100 underline font-bold hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors duration-300">Ou volte para Home</a>
        <#else>
            <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Algo de errado não está certo! 🤔</h1>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Volte para o login e tente novamente.</p>
          <a href="${properties['signInUrl']!'http://localhost:3000/users/sign-in'}" class="text-primary underline font-bold hover:text-primary-hover transition-colors duration-300">Voltar para Login</a>
          <a href="${properties['homeUrl']!'http://localhost:3000'}" class="text-neutral-900 dark:text-neutral-100 underline font-bold hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors duration-300">Ou volte para Home</a>
        </#if>
      </div>
    </main>
    <div class="min-[500px]:block hidden absolute inset-0 m-auto min-h-full min-w-full bg-cover bg-center grayscale [background:linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,0.25)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')] dark:[background:linear-gradient(90deg,rgba(0,0,0,1),rgba(0,0,0,0.25)),radial-gradient(circle,rgba(0,0,0,0.0),rgba(0,0,0,1)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')]" />
  </body>
</html>
