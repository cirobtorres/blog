# BLOG

<details>
<summary style="font-size:20px;font-weight:500">DEVELOPMENT</summary>

### .env

#### Rename .env.example to **.env** and set up your environment.

### SSL

#### The keys must be placed in `/keys` folder.

### Java Spring Boot

#### I'm using IntelliJ community (free). Just set your .env variables inside IntelliJ local .env variables. If you don't want to make use of IntelliJ, you'll have to install a dotenv lib or, better yet (my opinion), you might create a simple shell script that loads the .env variables and run maven.

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

### Way easier. Just `run` docker command:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

### or (shell)

```sh
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
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

### SSL

#### I find easier to generate openssl keys with Ubuntu. Make sure to check your openssl version and adapt it to your needs.

```bash
/opt/openssl-3.5/bin/openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -out jwt-private.pem; /opt/openssl-3.5/bin/openssl pkey -in jwt-private.pem -pubout -out jwt-public.pem;

# And then move it to your location:
mv jwt-*.pem /mnt/c/Users/myuser/whateverFolderIAm/keys-dev
```

## KEYS

#### Spring boot is expecting raw base64 keys, instead .pem directly. This choice made the nightmare of having to decode the key stored in the dokploy .env file much easier to manage and the spring final code much simplier.

```bash
# Convert a .pem key inside a .pem file named jwt-private.pem to base64 to a file named private_final.txt
$priv = Get-Content jwt-private.pem | Where-Object { $_ -notmatch "-----" }
$priv -join "" | Set-Content private_final.txt

# Convert a .pem key inside a .pem file named jwt-public.pem to base64 to a file named public_final.txt
$pub = Get-Content jwt-public.pem | Where-Object { $_ -notmatch "-----" }
$pub -join "" | Set-Content public_final.txt
```
