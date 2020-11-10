# server-for-resizing-cropping-images :smile_cat:
### TEST D - high level

Simple Node.js server for resizing or cropping images with sign up/log in.

### additional functionality:
- saving history of operations in MongoDB
- added API endpoint to get history of operations, ability to specify time range

#### CHECK OUT THE .ENV-EXAMPLE FILE! YOU NEED TO DELETE  '-example' IN THE NAME AND PUT YOUR VALUES THERE. IT WON'T WORK WITHOUT IT!

## routers

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
----
pay attention, the next routers you can use only after log in(log in with google)
----
##### crop image 
```
    curl --location --request POST 'localhost:3000/v1/image/crop' \
    --header 'Content-Type: multipart/form-data' \
    --data-raw '{
        "image": "image.png",
        "width": "100px",
        "height": "100px"
    }'
```

##### resize image 
```
    curl --location --request POST 'localhost:3000/v1/image/resize' \
    --header 'Content-Type: multipart/form-data' \
    --data-raw '{
        "image": "image.png",
        "width": "100px",
        "height": "100px"
    }'
```

##### get history operations
```
    curl --location --request POST 'localhost:3000/v1/history/' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "dateStart": "2020-10-01",
        "dateFinish": "2020-10-13"
    }'
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
