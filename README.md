# teste-tecnico PokedeX

Projeto Desenvolvido para teste técnico para vaga de Desenvolvedor Full Stack.

### Documentação da API.
   https://documenter.getpostman.com/view/32027385/2s9YsFDtZ5 

### Instruções.

Caso não tenha em sua maquina, baixe Docker Desktop:
   https://www.docker.com/products/docker-desktop/

Clone o repositório do projeto:
  ``` 
     git clone https://github.com/AndreLHPsilva/test-pokedex.git
  ```
  ``` 
     cd test-pokedex
  ```
Caso tenha o VSCODE em sua maquina:
   ``` 
     code .
   ```
Execute os seguintes comandos para configurar o backend.
-  Backend:
   Entre na pasta do backend.
      ```
       cd backend
      ```
    Crie arquivo .ENV:
      -  Crie um arquivo .env com base no arquivo .env-example e configure as variáveis de ambiente necessárias. Você pode usar qualquer editor de texto para fazer isso.

Execute os seguintes comandos para configurar o frontend.
-  Frontend:
  Abra uma nova janela do terminal ou vá para o diretório raiz do projeto se você saiu da pasta "backend".

    Entre na pasta do frontend:
      ```
       cd ../frontend
      ```
    Crie arquivo .ENV:
      -  Crie um arquivo .env com base no arquivo .env-example e configure as variáveis de ambiente necessárias. Você pode usar qualquer editor de texto para fazer isso.

-  Volte para raiz do projeto:
    ```
     cd ..
    ```
- E depois:
    ```
     docker-compose up --build -d
    ```
- Aguarde alguns instantes e acesse a URL:
    http://localhost:5173/

OBS: Caso ocorra algum erro **Erro inesperado**, aguarde mais um pouco até o container estiver pronto. Após o container docker ser iniciado, atualize a página para utilizar o sistema.

  

### Testando a API
   - Você pode testar utilizando o POSTMAN, para isso, faça o download do mesmo: https://www.postman.com/downloads/ e instale em seu PC. Após o download e instalação, você pode importar a collection que está na raiz do projeto, nome: test_pokedex.postman_collection.json ou acessar este link: https://documenter.getpostman.com/view/32027385/2s9YsFDtZ5 onde se encontra a Documentação da API, com isso você conseguirá acessar a collection clicando em **RUN IN POSTMAN**

     ![image](https://github.com/AndreLHPsilva/test-pokedex/assets/112219645/12baf6d4-e4da-40e3-9286-707bc3959d97)

### Versão do NODE   
    v20.10.0
### Versão do NPM   
    v10.2.3
    
### Depêndencias do Frontend
    Desenvolvimento: 
      "@iconify/react": "^4.1.1",
      "@types/node": "^20.10.6",
      "@types/react": "^18.2.43",
      "@types/react-dom": "^18.2.17",
      "@typescript-eslint/eslint-plugin": "^6.14.0",
      "@typescript-eslint/parser": "^6.14.0",
      "@vitejs/plugin-react": "^4.2.1",
      "autoprefixer": "^10.4.16",
      "eslint": "^8.55.0",
      "eslint-plugin-react-hooks": "^4.6.0",
      "eslint-plugin-react-refresh": "^0.4.5",
      "postcss": "^8.4.32",
      "tailwindcss": "^3.4.0",
      "typescript": "^5.2.2",
      "vite": "^5.0.8
    Produção
      "@headlessui/react": "^1.7.17",
      "@hookform/resolvers": "^3.3.3",
      "axios": "^1.6.3",
      "notiflix": "^3.2.6",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-hook-form": "^7.49.2",
      "react-router-dom": "^6.21.1",
      "react-select": "^5.8.0",
      "tailwind-merge": "^2.2.0",
      "zod": "^3.22.4"
### Depêndencias do Backend
    Desenvolvimento: 
      "@types/bcrypt": "^5.0.2",
      "@types/cors": "^2.8.17",
      "@types/express": "^4.17.21",
      "@types/jsonwebtoken": "^9.0.5",
      "prisma": "^5.7.1",
      "tsconfig-paths": "^4.2.0",
      "typescript": "^5.3.3"
    Produção
     "@prisma/client": "^5.7.1",
      "axios": "^1.6.3",
      "bcrypt": "^5.1.1",
      "cors": "^2.8.5",
      "dotenv": "^16.3.1",
      "express": "^4.18.2",
      "express-async-errors": "^3.1.1",
      "jsonwebtoken": "^9.0.2",
      "reflect-metadata": "^0.2.1",
      "ts-node-dev": "^2.0.0",
      "tsyringe": "^4.8.0",
      "zod": "^3.22.4"
     
### Diagrama de Entidade-Relacionamento
![ERD](https://github.com/AndreLHPsilva/test-pokedex/assets/112219645/d952c4c6-3cf7-4785-94f0-72ad2bf687c3)

### Imagens do Projeto
![Cadastro](https://github.com/AndreLHPsilva/test-pokedex/assets/112219645/8e2b8d16-4ac3-4fd1-ab5a-901c3b474618)
![Login](https://github.com/AndreLHPsilva/test-pokedex/assets/112219645/b3bf30c6-f2bb-468c-8284-64e66bf74500)
![Home](https://github.com/AndreLHPsilva/test-pokedex/assets/112219645/f7a92d01-a56f-48c0-86d5-ddf8fab7567e)

### Detalhes dos Requisitos para avaliação
Vamos te pedir para criar um sistema onde treinadores possam entrar se cadastrando com o seu nome de treinador e senha e, ao entrarem possuam essas seguintes funcionalidades.

1. Criar um time de pokémons com 5 pokémons (o total de pokémons no time é 5);
2. Listar todos os pokémons da API;
3. Filtrar tanto por nome quanto por tipo ou ambos, se eu não achar o pokémons pesquisando pelo nome quero que seja informado que o pokémon que eu procurei não existe na pokedéx;
4. Seja possível visualizar as evoluções dos pokémons.
5. O sistema deve ser desenvolvido com Docker e Docker compose onde, ao final do processo seja gerado um arquivo do Docker compose com todos os serviços necessários para rodar o sistema: (Backend, frontend, banco de dados etc...)
6. Para o desenvolvimento do Backend utilize Typescript com Nodejs, para o desenvolvimento do Frontend utilize Typescript com React usando o framework (Vite) e para o banco de dados se necessário o Postgres. A utilização do Docker com Docker compose é obrigatória.
7. Poste no seu GitHub o trabalho desenvolvido e encaminhe o link neste chat.

Recurso API a ser utilizada: https://pokeapi.co/


