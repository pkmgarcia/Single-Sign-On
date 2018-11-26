#!/bin/bash

cd ../client
npm run build
cd ../scripts

rm -r ../server/src/build

cp -r ../client/build ../server/src
