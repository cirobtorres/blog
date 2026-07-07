<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificar E-mail</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#3b82f6',
                    },
                    spacing: {
                        '125': '31.25rem',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased h-screen">
    <main class="h-full min-h-screen grid min-[700px]:grid-cols-[700px_1fr]">
        <div class="w-full h-full min-h-screen not-dark:shadow min-[700px]:border-r border-neutral-200 dark:border-neutral-800">
            <div class="h-screen p-1">
                <div class="h-full p-8 overflow-y-auto scrollbar flex flex-col justify-center">
                    <div class="max-w-125 w-full mx-auto flex flex-col justify-center gap-6">
                        <div class="flex flex-col gap-2">
                            <h1 class="text-3xl font-bold">Confirmar E-mail</h1>
                            <p class="text-sm text-neutral-600 dark:text-neutral-400">
                                Quase pronto! Precisamos apenas validar o seu endereço de e-mail para ativar sua conta.
                            </p>
                        </div>
                        <hr class="border-neutral-200 dark:border-neutral-800" />
                        <div class="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-sm text-blue-800 dark:text-blue-300">
                            <span class="font-bold block mb-1">Ação Requerida</span>
                            <#if message?? && message.summary??>
                                ${message.summary}
                            <#else>
                                Por favor, clique no botão abaixo para prosseguir com a ativação da sua conta.
                            </#if>
                        </div>
                        <#if actionUri??>
                            <a href="${actionUri}" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-9.5 flex items-center justify-center rounded transition-all shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Confirmar
                            </a>
                        <#else>
                            <!-- Enviando a query para disparar o Alert no Next.js -->
                            <a href="${properties['signInUrl']!'http://localhost:3000/users/sign-in?verified=true'}" class="text-xs text-neutral-500 underline underline-offset-2 text-center block">
                                Voltar para o Login
                            </a>
                        </#if>
                        <hr class="border-neutral-200 dark:border-neutral-800" />
                        <p class="text-xs text-center font-medium text-neutral-500">
                            Se o botão não funcionar, certifique-se de estar utilizando o link enviado recentemente.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="hidden min-[700px]:block grayscale flex justify-center items-center [background:linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,0.25)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')] dark:[background:linear-gradient(90deg,rgba(0,0,0,1),rgba(0,0,0,0.25)),radial-gradient(circle,rgba(0,0,0,0.0),rgba(0,0,0,1)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')]" />
    </main>
</body>
</html>