#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# go to the module directory and create a *new* Git repo
cd "$GH_REPO"
git init
#git remote add origin "https://github.com/$GH_USER/$GH_REPO"

#git checkout --orphan module

# inside this git repo we'll pretend to be a new user
git config user.name "pentaho"
git config user.email "pentaho@pentaho.com"

# the first and only commit to this new Git repo contains all the
# files present with the commit message.
git add .
git commit -m "Pentaho Angular Toolkit Module $TRAVIS_BRANCH"
#git tag -a "$TRAVIS_BRANCH" -m "Release of version $TRAVIS_BRANCH"

# force push from the current repo's master
# (all previous history will be lost, since we are overwriting it.)
# we redirect any output to /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "https://$GH_TOKEN@github.com/$GH_USER/$GH_REPO.git" master:module > /dev/null 2>&1
#git push --tags "https://$GH_TOKEN@github.com/$GH_USER/$GH_REPO.git"