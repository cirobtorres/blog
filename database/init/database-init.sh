#!/bin/bash
set -e

# Fallback
DB_API_NAME="${SB_DB_NAME:-database_spring}"
DB_API_USER="${SB_DB_USER:-database_spring_user}"
DB_API_PASS="${SB_DB_PASSWORD:-database_spring_password}"

DB_KC_NAME="${KC_DB_NAME:-database_keycloak}"
DB_KC_USER="${KC_DB_USERNAME:-database_keycloak_user}"
DB_KC_PASS="${KC_DB_PASSWORD:-database_keycloak_password}"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- API Spring Boot
    CREATE DATABASE "${DB_API_NAME}";
    CREATE USER "${DB_API_USER}" WITH ENCRYPTED PASSWORD '${DB_API_PASS}';
    GRANT ALL PRIVILEGES ON DATABASE "${DB_API_NAME}" TO "${DB_API_USER}";

    -- Keycloak
    CREATE DATABASE "${DB_KC_NAME}";
    CREATE USER "${DB_KC_USER}" WITH ENCRYPTED PASSWORD '${DB_KC_PASS}';
    GRANT ALL PRIVILEGES ON DATABASE "${DB_KC_NAME}" TO "${DB_KC_USER}";
EOSQL