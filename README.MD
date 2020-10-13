# server-for-resizing-cropping-images :smile_cat:
### TEST D - high level

Simple Node.js server for resizing or crop images (interact using Postman).

### additional functionality:
- saving history of operations in MongoDB
- added API endpoint to get history of operations, ability to specify time range.

## routers

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
    curl --location --request POST 'localhost:3000/v1/image/history' \
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
