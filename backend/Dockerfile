FROM openjdk:17

WORKDIR /app

COPY target/*.jar app/backend.jar

ENTRYPOINT ["java", "-jar", "app/backend.jar"]