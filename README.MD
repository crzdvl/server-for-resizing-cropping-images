# server-for-resizing-cropping-images :smile_cat:
### TEST D - high level

Simple Node.js server for resizing or cropping images with sign up/log in.

### additional functionality:
- saving history of operations in MongoDB
- added API endpoint to get history of operations, ability to specify time range

#### CHECK OUT THE .ENV-EXAMPLE FILE! YOU NEED TO DELETE  '-example' IN THE NAME AND PUT YOUR VALUES THERE. IT WON'T WORK WITHOUT IT!

## you can start from

localhost:3000/v1/page/signup

localhost:3000/v1/auth/login

localhost:3000/v1/auth/signup

## other functionalities

![functionalities](https://i.ibb.co/4VL3Z8N/Screenshot-from-2020-11-24-20-48-21.png)

## routers backend

### Auth

##### sign up 
```
    curl --location --request POST 'localhost:3000/v1/auth/signup' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "firstName": "Myrzik",
        "lastName": "Kotiko",
        "email": "myrzik@mailcom",
        "password": "pass123"
    }'
```

##### log in
```
    curl --location --request POST 'localhost:3000/v1/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "myrzik@mailcom",
        "password": "pass123"
    }'
```

##### log out
```
    curl --location --request GET 'localhost:3000/v1/auth/logout' \
```

##### sign up or log in with Google
```
    curl --location --request GET 'localhost:3000/v1/auth/google' \
```

#### pay attention, the next routers you can use only after log in(log in with google)

### Image

##### crop or resize image 
```
    curl --location --request POST 'localhost:3000/v1/image/edit' \
    --header 'Content-Type: multipart/form-data' \
    --data-raw '{
        "image": "image.png",
        "width": "100px",
        "height": "100px"
        "radios": "crop"
    }'
```

### History

##### get history operations with a specified time
```
    curl --location --request POST 'localhost:3000/v1/history/' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "dateStart": "2020-10-01",
        "dateFinish": "2020-10-13"
    }'
```

##### download csv history of image operations
```
    curl --location --request GET 'localhost:3000/v1/csv' \
```

##### get average statistic of size dowloading files and params operations
```
    curl --location --request GET 'localhost:3000/v1/history/avg' \
```

##### get average statistic of params operations grouped in days for one user
```
    curl --location --request POST 'localhost:3000/v1/history/avgUnique' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "kitty@email.com",
    }'
```

##### get sorted list of user with information about operations
```
    curl --location --request GET 'localhost:3000/v1/history/sum' \
```

### installation

Install the dependencies and devDependencies and start the server.

```sh
$ cd server-for-resizing-cropping-images
$ npm i
$ npm start
```

license
----

MIT


**Free Software, Hell Yeah!** :dog:
