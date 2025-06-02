Marcelo Luis dos Santos Raimundo 6324637
# Projeto App com Docker

Este documento explica detalhadamente como configurar, construir e executar o projeto utilizando Docker e Docker Compose. Aqui você encontrará uma descrição da estrutura do projeto, dos componentes que compõem a aplicação (como o contêiner da aplicação Node.js, o banco de dados e o Nginx como proxy reverso) e os comandos necessários para construir e subir os contêineres.

---

## 1. Estrutura do Projeto

A estrutura esperada do projeto é a seguinte:

```
c:\Users\celim\Desktop\app\
├── APP\
│   ├── app.js                # Arquivo principal da aplicação Node.js
│   ├── controllers\         # Controllers (ex.: turma.controller.js, professor.controller.js, etc.)
│   ├── models\              # Models (ex.: aluno.model.js, turma.model.js, etc.)
│   └── routes\              # Rotas (ex.: turma.routes.js, etc.)
├── config\
│   └── database.js          # Arquivo de conexão com o banco de dados
├── package.json             # Dependências e scripts do Node.js
├── Dockerfile.app           # Dockerfile para a aplicação Node.js
├── Dockerfile.nginx         # Dockerfile para o Nginx (proxy reverso)
├── docker-compose.yml       # Orquestração dos contêineres
├── nginx.conf               # Configuração do Nginx
└── script.sql               # Script para inicialização do banco de dados (se aplicável)
```

**Observação:**  
Certifique-se de que os caminhos utilizados nos arquivos `require()` (nos controllers e models) estejam corretos e respeitem a estrutura apresentada.  
Por exemplo, se um model está em `APP/models` e o arquivo de conexão em `config/database.js`, o caminho relativo adequado pode ser `../../config/database` (dependendo da localização do arquivo que invoca).

---

## 2. Descrição dos Componentes

### 2.1. Aplicação (Node.js)
- **Localização:** Pasta `APP`
- **Arquivo principal:** `APP/app.js`
- **Função:** Inicializa o servidor Express, define as rotas e configura os middlewares.  
- **Início do contêiner:** O comando de inicialização especificado no Dockerfile é:
  ```
  CMD ["node", "APP/app.js"]
  ```

### 2.2. Banco de Dados
- **Imagem Docker:** Usando MySQL (ou a imagem configurada no `docker-compose.yml`)
- **Configuração:** Variáveis de ambiente definidas para o banco (nome do banco, usuário, senha, etc.)  
- **Script de inicialização:** O arquivo `script.sql` é mapeado para inicializar o banco automaticamente.

### 2.3. Nginx (Proxy Reverso)
- **Função:** Redireciona as requisições HTTP da porta 80 para o contêiner da aplicação (porta 3000).
- **Configuração:** Utiliza o arquivo `nginx.conf`, que contém algo como:
  ```nginx
  server {
      listen 80;
      server_name localhost;

      location / {
          proxy_pass http://app:3000;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
      }
  }
  ```
- **Construção:** O Dockerfile do Nginx copia o `nginx.conf` para a pasta correta do contêiner (`/etc/nginx/conf.d/default.conf`).

---

## 3. Arquivos Docker

### 3.1. Dockerfile.app

Exemplo de conteúdo:
```dockerfile
# filepath: c:\Users\celim\Desktop\app\Dockerfile.app
FROM node:18-alpine

WORKDIR /usr/src/app

# Copia os arquivos de dependência e instala as dependências
COPY package*.json ./
RUN npm install

# Copia todo o projeto para o contêiner
COPY . .

# (Opcional) Lista o conteúdo do diretório APP/routes para depuração
RUN echo "Conteúdo de APP/routes:" && ls -la APP/routes/

EXPOSE 3000

# Inicia a aplicação
CMD ["node", "APP/app.js"]
```

### 3.2. Dockerfile.nginx

Exemplo de conteúdo:
```dockerfile
# filepath: c:\Users\celim\Desktop\app\Dockerfile.nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

### 3.3. docker-compose.yml

Exemplo completo:
```yaml
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.app
    ports:
      - "3000:3000"
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: escolar
      MYSQL_USER: usuario
      MYSQL_PASSWORD: senha
      MYSQL_ROOT_PASSWORD: root
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
      - ./script.sql:/docker-entrypoint-initdb.d/script.sql

  nginx:
    build:
      context: .
      dockerfile: Dockerfile.nginx
    depends_on:
      - app
    ports:
      - "80:80"

volumes:
  db_data:
```

---

## 4. Passo a Passo para Subir a Aplicação com Docker

### 4.1. Pré-requisitos
- Docker e Docker Compose instalados.
- Estrutura de projeto conforme descrita.

### 4.2. Comandos para Construir e Executar
1. **Navegue até a pasta do projeto**  
   Abra o terminal e acesse:
   ```bash
   cd c:\Users\celim\Desktop\app
   ```

2. **Construir os contêineres sem cache (opcional, para garantir que as últimas alterações sejam aplicadas):**
   ```bash
   docker-compose build --no-cache
   ```

3. **Subir os contêineres em modo detached:**
   ```bash
   docker-compose up -d
   ```

4. **Verificar os contêineres em execução:**
   ```bash
   docker-compose ps
   ```

5. **Acessar a aplicação:**
   Abra um navegador e acesse:
   ```
   http://localhost
   ```
   O Nginx (na porta 80) redirecionará as requisições para a aplicação Node.js na porta 3000.

6. **Visualizar logs para depuração (se necessário):**
   - Para os logs do app:
     ```bash
     docker-compose logs app
     ```
   - Para os logs do Nginx:
     ```bash
     docker-compose logs nginx
     ```
   - Para os logs do banco de dados:
     ```bash
     docker-compose logs db
     ```

---

## 5. Depuração e Possíveis Problemas

- **"MODULE_NOT_FOUND":**  
  Verifique se os caminhos dos `require()` nos arquivos de controllers e models estão corretos e respeitam a estrutura do projeto. Lembre que o ambiente Docker (baseado em Linux) é case-sensitive.

- **Erros de Build no Dockerfile:**  
  Se houver erro ao listar diretórios ou copiar arquivos, verifique se o caminho informado está correto (por exemplo, no comando `ls -la APP/routes/`).

- **Conexão entre contêineres:**  
  No `docker-compose.yml`, o nome dos serviços (como `app`) é utilizado internamente para comunicação entre os contêineres. No nginx.conf, o `proxy_pass http://app:3000` espera que o serviço `app` esteja disponível na rede criada pelo Compose.

---

## 6. Conclusão

Seguindo os passos acima, você deverá conseguir construir e subir o projeto com Docker sem problemas. Se ocorrerem erros, verificar os logs dos contêineres pode ajudar a identificar a origem do problema. Lembre-se de que alterações na estrutura de pastas ou caminhos dos arquivos podem exigir ajustes nos comandos de cópia e nos `require()` dentro do código.

