##### Stage 1
FROM node:latest as node
LABEL author="Frederick John"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod

##### Stage 2
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# --tag, -t Name and optionally a tag in the 'name:tag' form
# --file, -f Name of the Dockerfile, defaults to ./Dockerfile

# docker build -t aws-quiz -f nginx.prod.dockerfile .
# docker run -p 8080:80 aws-quiz



# Freddy@Fredericks-iMac aws-quiz % docker build -t aws-quiz -f nginx.dockerfile .
# Sending build context to Docker daemon  2.719MB
# Step 1/3 : FROM nginx:alpine
#  ---> 7d0cdcc60a96
# Step 2/3 : LABEL author="Frederick John"
#  ---> Using cache
#  ---> f66282f62667
# Step 3/3 : COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
#  ---> Using cache
#  ---> 63eb13320c03
# Successfully built 63eb13320c03
# Successfully tagged aws-quiz:latest
