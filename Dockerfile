FROM node:alpine

WORKDIR /opt
# bibliotecas globais
RUN npm i global  caniuse-lite browserslist@latest typescript@3.5.2 tslint mocha chai-http chai gulp-cli @angular/cli@8.3.21 @angular/animations@^8.2.14 
# arquivos de configuração
ADD ./package.json .
ADD ./gulpfile.js .
ADD ./tsconfig.json .
ADD ./firebase.json .
# variaveis de ambiente
ENV apiKey=AIzaSyCBOJ_F1wvRGa40_0bTDCWfEXLfPPP7810
ENV authDomain=magno-test-rovema.firebaseapp.com
ENV projectId=magno-test-rovema
ENV storageBucket=magno-test-rovema.appspot.com
ENV MONGODB_URI=mongodb://rovematest:0viou8HgbGHwYhbP@cluster0-shard-00-00-aebqu.mongodb.net:27017,cluster0-shard-00-01-aebqu.mongodb.net:27017,cluster0-shard-00-02-aebqu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
ENV GOOGLE_APPLICATION_CREDENTIALS=firebase.json
ENV FIREBASE_SERVICE_ACCOUNT_KEY_PATH=firebase.json
ENV FIREBASE_CONFIG=firebase.json
ENV FIREBASE_DATABASE_URL=https://magno-test-rovema.firebaseio.com
ENV PORT=$PORT
# instação das depedencias da API
RUN npm i --save
RUN mkdir ./front

COPY /test ./test/
COPY /api ./api/
COPY /front ./front

ADD ./front/package.json ./front

# instação das depedencias do FRONT
RUN npm run build

# https://devcenter.heroku.com/articles/container-registry-and-runtime#getting-started
# TODO: remover comentario das duas linhas abaixo para produção 
RUN cd front/ && npm i --save
RUN cd front/ && npm run build

CMD npm start