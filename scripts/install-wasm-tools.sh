#!/bin/bash
set -eux

# Install wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s -- -f

# Install wasm32-unknown-unknown target
rustup target add wasm32-unknown-unknown
