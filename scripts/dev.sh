#!/bin/bash

cd ../client
npm run build
cd ../scripts

rm -r ../server/build

cp -r ../client/build ../server/src
