#!/bin/sh

echo ">> Compiling and depoying contract"

docker pull tronbox/tre

docker run -it \
-p 9090:9090 \
--rm \
--name tron \
tronbox/tre

tronbox test ./test/Lock.js