FROM node:alpine
LABEL author="Frederick John"
WORKDIR /var/www/aws-quiz-server
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
