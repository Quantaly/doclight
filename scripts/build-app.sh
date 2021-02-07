#!/bin/bash
set -eux

cd app
npm install
npm run build || npm run build # try twice bcuz sometimes it does not work the first time
