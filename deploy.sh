#!/bin/bash
cwd=$(pwd)
echo "install npm dependencies for saqi-app"
cd saqi-app
npm i
echo "install npm dependencies for saqi-app"
cd saqi-app
npm run build
sudo cp -r ./dist/ /var/www/XXXXX.XXXXX.XXX.XX/saqi-app
sudo cp /var/www/XXXXX.XXXXX.XXX.XX/saqi-app/vite.svg /var/www/XXXXX.XXXXX.XXX.XX/saqi-app/assets/vite.svg
sudo cp /var/www/XXXXX.XXXXX.XXX.XX/saqi-app/saqi.png /var/www/XXXXX.XXXXX.XXX.XX/saqi-app/assets/saqi.png

echo "Starting RDF server"
cd $cwd
pm2 start rdf-store/apache-jena-fuseki-4.6.1/ecosystem.config.js

echo "Copy PyLode documentation for ontolgy"
cd $cwd
sudo cp -r ./documentation/. /var/www/XXXXX.XXXXX.XXX.XX/