FROM node:latest
LABEL authors="ekaterina"

ENV DB_DSN="sqlite::memory"
ENV API_SECRET="bigbabytake"
ENV APP_PORT="8080"

WORKDIR /opt/app
COPY . .

RUN npm i

EXPOSE 8080
ENTRYPOINT ["npm", "run", "dev"]