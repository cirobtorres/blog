<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Verifique seu e-mail</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/tailwind.css">
  </head>
  <body class="flex justify-center items-center min-h-screen overflow-hidden antialiased bg-stone-100 dark:bg-stone-925">
    <main class="w-full flex justify-center items-center">
        <div class="max-w-120 p-4 flex flex-col justify-center items-center gap-6">
            <div class="">
                <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    Verifique seu e-mail
                </h1>
            </div>

            <p class="text-neutral-600 dark:text-neutral-500">
                O cadastro foi criado com sucesso. Agora, você só precisa validar sua conta clicando no link que enviamos para <strong class="font-bold text-neutral-600 dark:text-neutral-100">${user.email!"seu e-mail"}</strong>.
            </p>

            <a id="resend-link" href="${url.loginAction}" class="font-medium transition-all duration-300 text-neutral-600 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-400 hover:border-stone-400 dark:hover:border-stone-700 hover:bg-stone-300 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-800 px-2 py-0.5 rounded-lg bg-stone-200 dark:bg-stone-900 italic rounded border border-transparent focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary focus-visible:text-neutral-900 dark:focus-visible:text-neutral-400 focus-visible:bg-stone-300 dark:focus-visible:bg-stone-800">
                Receber novo link
            </a>

            <a href="${properties['homeUrl']!'http://localhost:3000/'}" class="mx-auto font-medium text-primary/75 hover:text-primary dark:hover:text-primary transition-all duration-300 underline underline-offset-2 rounded border border-transparent focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary">
                Voltar para home
            </a>
        </div>
    </main>
    <script>
        (() => {
            const resendLink = document.getElementById("resend-link");
            if (!resendLink) return;

            const COOLDOWN_SECONDS = 60;
            const STORAGE_KEY = "kc_resend_cooldown_end";

            const setDisabledState = (disabled) => {
            if (disabled) {
                resendLink.style.pointerEvents = "none";
                resendLink.classList.add("opacity-50", "cursor-not-allowed");
                resendLink.classList.remove("hover:text-primary");
            } else {
                resendLink.style.pointerEvents = "auto";
                resendLink.classList.remove("opacity-50", "cursor-not-allowed");
                resendLink.classList.add("hover:text-primary");
                resendLink.textContent = "Receber novo link";
            }
            };

            const startTimer = (endTime) => {
                setDisabledState(true);
                const interval = setInterval(() => {
                    const remaining = Math.ceil((endTime - Date.now()) / 1000);
                    if (remaining <= 0) {
                        clearInterval(interval);
                        localStorage.removeItem(STORAGE_KEY);
                        setDisabledState(false);
                    } else {
                        resendLink.textContent = "Aguarde " + remaining "s para reenviar";
                    }
                }, 1000);
            };

            const savedEndTime = localStorage.getItem(STORAGE_KEY);
            if (savedEndTime && Date.now() < parseInt(savedEndTime, 10)) {
                startTimer(parseInt(savedEndTime, 10));
            }

            resendLink.addEventListener("click", (e) => {
                const currentEndTime = localStorage.getItem(STORAGE_KEY);
            
                if (currentEndTime && Date.now() < parseInt(currentEndTime, 10)) {
                    e.preventDefault();
                    return;
                }

                const endTime = Date.now() + COOLDOWN_SECONDS * 1000;
                localStorage.setItem(STORAGE_KEY, endTime.toString());

                startTimer(endTime);
            });
        })();
    </script>
  </body>
</html>
