#!/bin/sh

echo ">> Compiling and depoying contract"

docker pull tronbox/tre

docker run -it \
-p 8080:8080 \
--rm \
--name tron \
tronbox/tre

tronbox test ./test/glint.js

#  Deploying contracts to development network...
ERROR: read ECONNRESET