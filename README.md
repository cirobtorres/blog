# BLOG

## Config

### mkcert

#### Secure cookies, local HTTPS + reverse proxy. Inside /certs, type in:

```bash
mkcert -install
mkcert yourdomain.com localhost 127.0.0.1
```

#### Result:

```txt
yourdomain.com.pem
yourdomain.com-key.pem
```

#### For hosting local domains while developing (either production or development mode), you must **add the custom yourdomain.com to you `C:\Windows\System32\drivers\etc\hosts`** file when using mkcert, like so (just add it on the last line):

```txt
127.0.0.1   yourdomain.com api.yourdomain.com
```

#### While mkcert handles the creation and trust of the SSL certificate, it does not automatically configure your computer to map a custom domain name (yourdomain.com) to your local machine (127.0.0.1).

### NGINX

#### **Rename `yourdomain.com` placeholders to your actual domain.**

```nginx
events {}

http {

  server {
    listen 443 ssl;
    server_name yourdomain.com; # HERE

    ssl_certificate     /certs/yourdomain.com.pem; # HERE
    ssl_certificate_key /certs/yourdomain.com-key.pem; # HERE

    ...
  }
}
```

### SSL

#### I find easier to generate openssl keys with Ubuntu. Make sure to check your openssl version and adapt it to your needs.

```bash
/opt/openssl-3.5/bin/openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -out jwt-private.pem; /opt/openssl-3.5/bin/openssl pkey -in jwt-private.pem -pubout -out jwt-public.pem;

# And then move it to your location:
mv jwt-*.pem /mnt/c/Users/myuser/whateverFolderIAm/keys-dev
```

<details>
<summary style="font-size:20px;font-weight:500">DEVELOPMENT</summary>

### .env

#### Rename .env.dev.example to **.env.dev** and set up your environment.

### SSL

#### The keys must be placed in `/keys-dev` folder.

### Java Spring Boot

#### Just set your .env variables.

### Next.js

```bash
cd .\web
pnpm dev
```

### Docker (nginx, postgres, pgadmin)

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

</details>

<details>
<summary style="font-size:20px;font-weight:500">PRODUCTION</summary>

### .env

#### **Rename .env.example to `.env` and set up your environment.**

### SSL

#### The keys must be placed in `/keys` folder.

### NGINX

#### Rename nginx.example.conf file to `nginx.conf`.

#### Run:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

</details>

## SUPABASE AS DATABASE

```yml
datasource.url: jdbc:postgresql://${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?prepareThreshold=0

POSTGRES_HOST=
POSTGRES_DB=postgres
POSTGRES_PORT=6543
POSTGRES_USER=
POSTGRES_PASSWORD=
```

```bash
$priv = Get-Content jwt-private.pem | Where-Object { $_ -notmatch "-----" }
$priv -join "" | Set-Content private_final.txt

$pub = Get-Content jwt-public.pem | Where-Object { $_ -notmatch "-----" }
$pub -join "" | Set-Content public_final.txt
```
