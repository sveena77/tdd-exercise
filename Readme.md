## Install dependencies
```bash
npm install
```

## Run tests
```bash
npm run test
```

## Start the service
### Run in development by babel-node via nodemon in a docker container
```bash
docker-compose up
```

### Build a new docker container and run in production mode where the code is transpiled by babel into a `build` folder and run directly in `node`
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

### Shutdown dev or production service
```bash
docker-compose down
```
