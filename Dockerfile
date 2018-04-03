FROM node:latest

# Install nginx
RUN apt update -y && \
    apt install nginx -y

# Copy local project into a directory in the image
COPY . /root/code

# Build the project
RUN cd /root/code && \
    npm install && \
    npm run build

# Move build output into nginx path
RUN cp -r /root/code/build/* /var/www/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
