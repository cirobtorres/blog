# build
FROM container-registry.oracle.com/java/openjdk:25 AS build

WORKDIR /build

COPY . .

RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# run
FROM container-registry.oracle.com/java/openjdk:25

WORKDIR /app

COPY --from=build /build/target/*.jar ./app.jar

EXPOSE 8080
EXPOSE 9090

ENV PROFILE_ACTIVE='production'
ENV TZ='America/Sao_Paulo'

ENTRYPOINT ["java", "-jar", "app.jar"]
