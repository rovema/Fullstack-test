FROM node:alpine

WORKDIR ~/

RUN npm i global add typescript@3.5.2 tslint mocha gulp-cli @angular/cli @angular/animations 

ADD ./package.json .
ADD ./gulpfile.js .
ADD ./tsconfig.json .
ADD ./firebase.json .
ADD ./front/package.json ./front

ENV apiKey=AIzaSyCBOJ_F1wvRGa40_0bTDCWfEXLfPPP7810
ENV authDomain=magno-test-rovema.firebaseapp.com
ENV projectId=magno-test-rovema
ENV storageBucket=magno-test-rovema.appspot.com
ENV MONGODB_URI=mongodb://rovematest:0viou8HgbGHwYhbP@cluster0-shard-00-00-aebqu.mongodb.net:27017,cluster0-shard-00-01-aebqu.mongodb.net:27017,cluster0-shard-00-02-aebqu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
ENV GOOGLE_APPLICATION_CREDENTIALS=firebase.json
ENV FIREBASE_SERVICE_ACCOUNT_KEY_PATH=firebase.json
ENV FIREBASE_CONFIG=firebase.json
ENV FIREBASE_DATABASE_URL=https://magno-test-rovema.firebaseio.com

RUN npm i --save

COPY /test ./test
COPY /api ./api
COPY /front ./front

RUN npm run build

RUN cd ./front && npm i --save && npm run build

RUN npm test

EXPOSE 3000 2500

CMD ["npm", "start"]