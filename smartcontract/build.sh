#!/bin/sh

echo ">> Compiling and depoying contract"

docker pull tronbox/tre

docker run -it \
-p 8080:800 \
--rm \
--name tron \
tronbox/tre

tronbox test ./test/glint.js

#  source .env && tronbox migrate --network nile