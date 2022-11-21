# !/bin/bash

echo 
echo This script is being run by $PARAM_ADMIN in $ENVIRONMENT environment
echo
echo Deployment platform is $PLATFORM

ruby "./task.rb"

