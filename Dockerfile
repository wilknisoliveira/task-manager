FROM node:18 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:1.25
COPY --from=node /app/dist/task-manager /usr/share/nginx/html

EXPOSE 80