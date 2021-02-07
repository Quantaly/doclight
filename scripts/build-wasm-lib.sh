#!/bin/bash
set -eux

cd wasm-lib
wasm-pack build
