# Keycloak

## Realm

- Primeira coisa a se fazer é criar um `realm`. Nomeie-o do que você quiser. Ex.: `blog-realm`. A partir de agora, certifique-se que você esteja dentro do seu realm, nunca no `master`;
- Caso você delete o usuário admin, crie um novo assim:

```sh
./kc.bat bootstrap-admin user

# ou

./kc.sh bootstrap-admin user
```

## Realm Settings

- TODO

## Clients

- TODO

### Real Roles

- TODO

### Next.js: `blog-next`

- Painel esquerdo: `Clients` > `Create Client`

1. `Client ID`: ex. `blog-next`
2. `Root URL`: http://localhost:3000
3. `Home url`: http://localhost:3000
4. `Redirect URIs`: `http://localhost:3000/api/auth/callback/keycloak`, `http://localhost:3000/api/auth/callback`, `http://localhost:3000/*`, `http://localhost:3000/users/sign-in/validate-email/success`
5. `Web origins`: http://localhost:3000
6. `Admin URL`: http://localhost:3000
7. `Direct Access Grant`

### Service Account Roles:

- Open the tab Assign role and filter by manage-users: mark it as true

### Spring Boot: `blog-api`

- `Client ID`: ex. `blog-api`
- Client Authentication: true
- Service Account Roles: true. Then, navigate to Service Account Roles and assign role manage-users

### Client Secret: inside Credentials tab. Copy it to your project

### Spring Boot might need to accept multiple audiences in order to validate the JWT, otherwise your signIn might works for Keycloak, and neglected by Spring Boot. In this project, at least two must be included. The one that has been created inside Spring Boot, and that which comes from the client as well. Follow as ahead:

- Left admin pannel > Client Scopes > Create client scope. Name it. Ex.: blog-api-audience. Go to: Mappers > Configure a new mapper > Audience. Name it. Ex.: blog-api-audience-mapper. Add frontend client id, that one inside your KEYCLOAK_BLOG_API_CLIENT_ID. Save. Now, go to Clients again, and navigate to web client this time. Client scopes > Add client and choose the blog-api-audience we had just created. Set it as default.

```bash
./kc.sh start-dev --http-port=8085 --spi-theme--static-max-age=-1 --spi-theme--cache-themes=false --spi-theme--cache-templates=false

./kc.bat start-dev --http-port=8085 --spi-theme--static-max-age=-1 --spi-theme--cache-themes=false --spi-theme--cache-templates=false
```

## Providers

### Github

- No painel do github apps, você precisa criar o app e extrair o `client id`, `client key` e definir a home `https://SEU_DOMINIO.com.br` e o `redirect_uri`, que para keycloak é `https://auth.SEU_DOMINIO.com.br/realms/NOME_DO_SEU_REALM/broker/github/endpoint`. Esses `client id`, `client key` e `redirect_uri` devem ir para o painel administrativo do `Keycloak`, lá onde se configuram os provedores.

### Google

- O bom do `Google` que ele permite vários `redirect_uris`, então fica fácil testá-lo em produção e desenvolvimento. Fora que ele permite rotas http (desenvolvimento de novo);
- No painel do `Google Cloud`, crie o APP. você precisa criar o app e extrair o `client id`, `client key` e definir a home `https://SEU_DOMINIO.com.br` e o `redirect_uri`, que para keycloak é `https://auth.SEU_DOMINIO.com.br/realms/NOME_DO_SEU_REALM/broker/google/endpoint`.
