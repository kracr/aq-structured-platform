# SAQI: An Ontology based Knowledge GraphPlatform for Social Air Quality Index

## Links to the deployed version of ontology, docs and app.

1. SAQI app - [kracr.iiitd.edu.in/saqi-app/](https://kracr.iiitd.edu.in/saqi-app/)
2. Sparql endpoint for ontology populated with data collected during the project - [kracr.iiitd.edu.in/sparql/#/dataset/aq-store/query](https://kracr.iiitd.edu.in/sparql/#/dataset/aq-store/query)
3. PyLODE documentation for the ontology - [kracr.iiitd.edu.in/ontology/saqi](https://kracr.iiitd.edu.in/ontology/saqi)
4. SAQI Dataset - https://doi.org/10.5281/zenodo.10300235 

> **Directory Structure of the repo**

    .
    ├── dataset                 # Local sensors, CPCB data and anonymized questionnaire responses
    ├── mappings                # YARRRML and compiled mapping files to poulate KG
    ├── ontology                # Ontology and ODP descriptions in RDF/XML format
    ├── rdf-store               # Slightly configured and modified apache jena fuseki server
    ├── saqi-app                # SAQI app made with svelte and compiled with vite.js
    ├── scripts                 # scripts to upload data to rdf-store from csv files using mappings
    ├── deploy.sh               # Deployment script for server
    └── README.md

# Steps to run rdf store and app on local setup

## Prerequisites
- jre-11 for fuseki server
- python 3.6 or higher for running scripts to populate graph
- npm to build and run svelte app

> Run inside pm2 for better monitoring  - `npm install pm2 -g`
- `pm2 start ./rdf-store/apache-jena-fuseki-4.6.1/ecosystem.config.js`
- Go to http://localhost:3030/ and create new database `aq-store`.

> Upload all existing triples to the rdf store
- `python upload_to_rdf.py http://localhost:3030/` 

> Install dependencies for svelte and start server locally
- `cd saqi-app`
- `npm i`
- `npm run dev`

## Scripts for deployment on kracr website

> Pull latest changes and run the script to deploy.sh

- `./deploy.sh`

> If there is no npm installed, copy build files from local machine

- `scp -r ./saqi-app/dist iiitd@192.168.1.166:`
- Inside VM -
- `sudo cp -r ./dist/ /var/www/kracr.iiitd.edu.in/saqi-app`
- `sudo cp /var/www/kracr.iiitd.edu.in/saqi-app/vite.svg /var/www/kracr.iiitd.edu.in/saqi-app/assets/vite.svg`
- `sudo cp /var/www/kracr.iiitd.edu.in/saqi-app/saqi.png /var/www/kracr.iiitd.edu.in/saqi-app/assets/saqi.png`


## Routing changes to nginx
At `/etc/nginx/sites-available/kracr.iiitd.edu.in`

```
    location /sparql/ {
        proxy_pass         http://192.168.1.166:3030/;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
    }

    location ~ /aq-store(.*) {
        proxy_pass   http://192.168.1.166:3030/aq-store$1;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
    }

    location ~ /ontology/saqi/?(.*)$ {
        try_files $uri $uri/ /saqi.html;
    }

    location ~ /saqi-app/?(.*)$ {
        include /etc/nginx/mime.types;
        try_files $uri $uri/ /saqi-app/index.html;
    }
    location /ontology/webvowl/ {
        alias /var/www/kracr.iiitd.edu.in/webvowl/;
    }
```
At `/etc/nginx/nginx.conf`
```
http {
    . . .
    include /etc/nginx/mime.types;
    client_max_body_size 100M;
    . . .

}
```
> After Editing, reload nginx config with - `sudo systemctl restart nginx`
### License information
Apache 2.0 License
