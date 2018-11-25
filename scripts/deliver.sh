#!/bin/bash

cd ../server
export JENKINS_NODE_COOKIE=dontKillMe
pm2 restart npm -- start

