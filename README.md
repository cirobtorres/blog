# BLOG

<details open=true>
<summary style="font-size:20px;font-weight:500">DEVELOPMENT</summary>

### .env

- For development, you won't need the root .env file. Rename your .env.local.example **.env.local** and set up your environment. For Java Spring Boot I'd recommend IntelliJ community (free). Edit your application configuration and set/import your .env variables.

### Keycloak

#### Realm

- Left pannel > Manage realms > Create Realm. Name it whatever you want. Ex.: blog-realm. Everything from now on must be done inside your realm. Do not forget to navigate to your realm everytime you log in to admin panel. In case you accidently delete admin user, create a new one with code below:

```bash
./kc.sh bootstrap-admin user

./kc.bat bootstrap-admin user
```

#### Realm Settings

- TODO

#### Clients

- TODO

#### Real Roles

- TODO

#### Next.js Client

- Now, go to: Left pannel > Clients > Create Client

1. Client ID: name it whatever you want. Ex.: blog-next
2. Root URL: set http://localhost:3000
3. Redirect URIs: set http://localhost:3000/\*
4. Web origins: set http://localhost:3000
5. Admin URL: http://localhost:3000

##### Client Secret: inside Credentials tab. Copy it to your project

##### Service Account Roles:

- Open the tab Assign role and filter by manage-users: mark it as true

#### Spring Client

- Client ID: name it whatever you want. Ex.: blog-api
- Client Authentication: true
- Service Account Roles: true. Then, navigate to Service Account Roles and assign role manage-users

##### Client Secret: inside Credentials tab. Copy it to your project

##### Spring Boot might need to accept multiple audiences in order to validate the JWT, otherwise your signIn might works for Keycloak, and neglected by Spring Boot. In this project, at least two must be included. The one that has been created inside Spring Boot, and that which comes from the client as well. Follow as ahead:

- Left admin pannel > Client Scopes > Create client scope. Name it. Ex.: blog-api-audience. Go to: Mappers > Configure a new mapper > Audience. Name it. Ex.: blog-api-audience-mapper. Add frontend client id, that one inside your KEYCLOAK_BLOG_API_CLIENT_ID. Save. Now, go to Clients again, and navigate to web client this time. Client scopes > Add client and choose the blog-api-audience we had just created. Set it as default.

```bash
./kc.sh start-dev --http-port=8085 --spi-theme--static-max-age=-1 --spi-theme--cache-themes=false --spi-theme--cache-templates=false

./kc.bat start-dev --http-port=8085 --spi-theme--static-max-age=-1 --spi-theme--cache-themes=false --spi-theme--cache-templates=false
```

### Next.js

```bash
cd .\web

pnpm i

pnpm dev
```

### Database

#### There is a couple of options. I believe the easiest one is Docker

```bash
docker-compose up -d --build
```

#### If you have no access to DOcker for whatever the reason, Supabase comes in very handy for development situation in my opinion. Supabase > authenticate > create a new project > dashboard > connect (button somewhere on top) > direct > session pooler.

![Location of the connect button on Supabase dashboard](image-1.png)

![DIrect connection, session pooler](image-2.png)

```yml
datasource.url: jdbc:postgresql://${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?prepareThreshold=0

POSTGRES_HOST=
POSTGRES_DB=postgres
POSTGRES_PORT=6543
POSTGRES_USER=
POSTGRES_PASSWORD=
```

</details>

<details open=true>
<summary style="font-size:20px;font-weight:500">PRODUCTION</summary>

### Keycloak

Exporting Keycloak configuration from dev to production. Obs.: `--users skip` ignore test users.

```sh
.\kc.bat export --dir .\export --realm my-realm-name --users skip
```

Creating a docker volume to Keycloak.

```sh
docker run --rm -v keycloak_data:/data -v $(pwd)/keycloak/import:/out alpine cp /data/export/blog-realm-realm.json /out/
```

### .env

#### **Rename .env.example to `.env` and set up your environment.**

```bash
docker-compose up -d --build
```

### Docker

- É preciso gerar o volume `Docker` do `Keycloak` para que ele seja lido em `build`. As configurações podem ser feitas durante desenvolvimento e quando tudo estiver pronto o volume precisa ser criado com o comando `CLI` interno do `Keycloak` para exportação, assim:

```sh
docker exec -it keycloak /opt/keycloak/bin/kc.sh export --dir /opt/keycloak/data/import --realm seu-nome-do-realm --users realm_file
```

- Se você criou usuários de teste e não quer esses usuários sendo enviados juntos ao `JSON` geral, troque `--users realm_file` por `--users skip`
- Assim que o arquivo existir, é imprescindível que os `SECRETS` sejam substituídos por variáveis de ambiente, pois eles serão gerados hardcoded no `JSON`. Do contrário não terá como enviá-los para o `Git`.

### Hostinger

Criar uma VPS para testes. Neste tutorial eu uso Dokploy.

#### DNS

- Contratar um domínio;
- Em domínios -> DNS / Nameservers -> SSL: ative o SSL (leva alguns minutos);
- Configure os registros de DNS. Nesta parte, é melhor pedir ao agente. Basicamente, cada subdomínio precisa ter um registro do tipo `A` (aponta para o endereço IP). Por exemplo: `admin` significa que `www.admin.seu-dominio.com.br` será o apelido do seu Dokploy, para você não ter de entrar diretamente digitando o endereço IP (e também para ter o encrypt SSL/secure HTTPS). Para este projeto, será necessário repetir o processo para: `admin`, `blog` (prefixo de domínio blog que usei), `api`, `www`, `auth` e `keycloak` (este por precaução). Todos apontam para seu endereço IP.

### Dokploy

#### Projeto

- No painel Dokploy, em settings (menu esquerdo), procure por Projects. Essa parte é bem fácil e é autoexplanatória também. Conecte-se ao seu Git, defina suas environments e configure o domains.

#### Github

- Para fazer por Github, já logado ao painel Dokploy, em settings (menu esquerdo), procure `Git`. Use o provedor `Github` e configur ele. É autoexplanatório. Permita os projetos que você queira que o Dokploy tenha acesso para CI/CD.

#### Settings

- Aqui vem o SSL do `www.admin.seu-dominio.com.br`. No Dokploy, menu esquerdo, em settings -> Web Server: registre o domínio (`www.admin.seu-dominio.com.br`), coloque seu email, ative HTTPS e certifique com `Let's Encrypt`.

</details>
