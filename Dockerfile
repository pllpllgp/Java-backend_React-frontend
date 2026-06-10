FROM azul/zulu-openjdk:21 AS builder
WORKDIR /app

COPY . .

RUN chmod +x ./gradlew

RUN ./gradlew clean bootJar -x test

FROM azul/zulu-openjdk:21
WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]