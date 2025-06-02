FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Listando o conteúdo do diretório APP/routes (corrija esse caminho se necessário)
RUN echo "Conteúdo de APP/routes:" && ls -la APP/routes/

EXPOSE 3000

CMD ["node", "APP/app.js"]