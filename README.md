<h1 style="font-size:3rem;font-weight:900;text-transform:uppercase;">Blog</h1>

<h2 style="font-size:2rem;text-transform:uppercase;">Next.js</h2>

```bash
npx create-next-app web

# Packages ==========------------------------------

npm i react-icons

npm i highlight.js # syntax highlight

npm i remark remark-html # markdown readers

npx shadcn@latest init -d # -d for default

# BELOW: dependencies for shadcn/ui
npm i next-themes # dark mode

npm i @radix-ui/react-accordion

npm i @radix-ui/react-tooltip # floating info baloon when you hover for some time over an element

npm i @radix-ui/react-slot # buttons
```

<h2 style="font-size:2rem;text-transform:uppercase;">Strapi</h2>

```bash
npx create-strapi@latest strapi
```

<p style="font-size:1.25rem;">HTTP request. To this URL: https://<span style="color:#d6cc60;">&lt;YOUR_DOMAIN&gt;</span>/api/<span style="color:#d6cc60;">&lt;YOUR_CT&gt;</span> with the header: Authorization: bearer <span style="color:#d6cc60;">&lt;YOUR_API_TOKEN&gt;</span></p>

<a href=https://docs.strapi.io/dev-docs/api/rest#api-parameters style="font-size:1.25rem;color:#f1a355;">API reference</a>

<h2 style="font-size:2rem;text-transform:uppercase;">Starting project</h2>

<ol style="font-size:1.25rem;">
<li>Rename web\<span style="color:#d6cc60">.env.local.example</span> to <span style="color:#d6cc60">.env.local</span></li>
<li>Create a Strapi <span style="color:#d6cc60">Token</span> and add it to <span style="color:#d6cc60">NEXT_PUBLIC_STRAPI_TOKEN</span>
<ul>
<li>(whatever you name it, it has to start with NEXT_PUBLIC...)</li></ul></li>
</ol>

<h2 style="font-size:2rem;text-transform:uppercase;">Links</h2>

<ul style="font-size:1.25rem;">
<li><a style="color:#f1a355;" href=https://nextjs.org/>Next.js</a></li>
<li><a style="color:#f1a355;" href=https://strapi.io/>Strapi</a></li>
<li><a style="color:#f1a355;" href=https://ui.shadcn.com/docs/installation/next>Shadcn/ui</a></li>
<li><a style="color:#f1a355;" href=https://highlightjs.org/>Highlight.js</a></li>
<li><a style="color:#f1a355;" href=https://github.com/remarkjs/remark>Remark</a></li>
<li><a style="color:#f1a355;" href=https://react-icons.github.io/react-icons/>React-Icons</a></li>
</ul>
