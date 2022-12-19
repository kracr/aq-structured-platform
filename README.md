# aq-structured-platform

## SAQI: An Ontology based Knowledge GraphPlatform for Social Air Quality Index

> Directory Structure of the repo

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

### Pre-requisits - require jre-11 for fuseki server, python 3.x.x for running scripts to populate graph and npm/yarn to build and run svelte app

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


### License information