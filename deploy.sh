#!/bin/bash
rm -rf deps/
rm -rf _build/
rm mix.lock

export MIX_ENV=prod

git pull origin master 

mix deps.get --only prod

mix compile

cd assets 

npm install

node_modules/brunch/bin/brunch build --production

cd ..

mix phx.digest 

MIX_ENV=prod PORT=8000 mix phx.server