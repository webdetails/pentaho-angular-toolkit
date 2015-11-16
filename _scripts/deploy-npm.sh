#!/bin/bash
set -e # exit with nonzero exit code if anything fails
cd $GH_REPO
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
npm publish --force