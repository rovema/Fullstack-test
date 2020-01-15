FROM node:alpine

WORKDIR ~/

RUN npm i global add typescript@3.5.2 tslint mocha gulp-cli

ADD ./package.json .
ADD ./gulpfile.js .
ADD ./tsconfig.json .
ADD ./firebase.json .

ENV apiKey=AIzaSyCBOJ_F1wvRGa40_0bTDCWfEXLfPPP7810
ENV authDomain=magno-test-rovema.firebaseapp.com
ENV projectId=magno-test-rovema
ENV storageBucket=magno-test-rovema.appspot.com
ENV MONGODB_URI=mongodb://rovematest:0viou8HgbGHwYhbP@cluster0-shard-00-00-aebqu.mongodb.net:27017,cluster0-shard-00-01-aebqu.mongodb.net:27017,cluster0-shard-00-02-aebqu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
ENV GOOGLE_APPLICATION_CREDENTIALS=firebase.json
ENV FIREBASE_SERVICE_ACCOUNT_KEY_PATH=firebase.json
ENV FIREBASE_CONFIG=firebase.json
ENV FIREBASE_DATABASE_URL=https://magno-test-rovema.firebaseio.com
ENV PORT=3000

RUN npm i --save

COPY /test ./test
COPY /api ./api

RUN npm run build

EXPOSE 3000 80

CMD ["npm", "run", "docker"]