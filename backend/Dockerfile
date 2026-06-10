FROM azul/zulu-openjdk:21 AS builder

WORKDIR /demo-web
COPY . .

RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar -x test

FROM azul/zulu-openjdk:21
WORKDIR /demo-web

COPY --from=builder /demo-web/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]