FROM node:16.15-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "./"]
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]