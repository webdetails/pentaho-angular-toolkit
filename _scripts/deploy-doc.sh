#!/bin/bash
# ******************************************************************************
#
# Pentaho
#
# Copyright (C) 2026 by Pentaho Canada Inc. : http://www.pentaho.com
#
# Use of this software is governed by the Business Source License included
# in the LICENSE.TXT file.
#
# Change Date: 2030-06-15
# ******************************************************************************
set -e # exit with nonzero exit code if anything fails

# go to the module directory and create a *new* Git repo
mkdir deploy_doc
cd deploy_doc
git init
git remote add -t gh-pages -f origin "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git"
git checkout gh-pages
git rm -rf *

# inside this git repo we'll pretend to be a new user
git config user.name "pentaho"
git config user.email "pentaho@pentaho.com"

# the first and only commit to this new Git repo contains all the
# files present with the commit message.
cp -r ../doc/* .
git add .
git commit -m "Pentaho Angular Toolkit Doc $TRAVIS_TAG" --allow-empty

# force push from the current repo's master
# (all previous history will be lost, since we are overwriting it.)
# we redirect any output to /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet origin gh-pages > /dev/null 2>&1