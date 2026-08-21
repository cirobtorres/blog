<#import "template.ftl" as layout>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${msg("pageExpiredTitle")}</title>
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
</head>

<body class="bg-neutral-50 dark:bg-neutral-900 flex min-h-screen flex-col items-center justify-center p-4 antialiased">

    <div class="w-full max-w-md rounded-xl border border-neutral-200/80 bg-white p-8 not-dark:shadow dark:border-neutral-800 dark:bg-neutral-950">
        
        <#-- Alert -->
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950/50">
            <svg class="h-6 w-6 text-amber-600 dark:text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </div>

        <#-- Main text -->
        <div class="mt-4 text-center">
            <h1 class="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                ${msg("pageExpiredTitle")}
            </h1>
            <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Por motivos de segurança, sua sessão de autenticação expirou devido à inatividade.
            </p>
        </div>

        <#-- Actions (redirects) -->
        <div class="mt-8 space-y-3">
            
            <#-- Link para reiniciar o fluxo que o usuário estava tentando fazer (Login/Register) -->
            <a href="${url.loginRestartFlowUrl}" 
               class="flex w-full items-center justify-center rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:ring-neutral-300">
                ${msg("pageExpiredRestartFlowText")}
            </a>

            <#-- Link para continuar diretamente na tela de login padrão se o restart falhar -->
            <a href="${url.loginAction}" 
               class="flex w-full items-center justify-center rounded-lg border border-neutral-200 bg-transparent px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-950 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900">
                ${msg("doLogIn")}
            </a>
            
        </div>

        <#-- Footer -->
        <#if properties.homeUrl?has_content>
            <div class="mt-8 border-t border-neutral-100 pt-4 text-center dark:border-neutral-900">
                <a href="${properties.homeUrl}" class="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                    &larr; Voltar para a aplicação principal
                </a>
            </div>
        </#if>

    </div>

</body>
</html>