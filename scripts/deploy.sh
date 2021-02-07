#!/bin/bash
set -eux

cd app
git config --global user.name $user_name
git config --global user.email $user_email
git remote set-url origin https://${github_token}@github.com/${repository}
npm run deploy