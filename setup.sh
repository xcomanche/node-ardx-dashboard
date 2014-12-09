#!/bin/bash

echo "Unpacking Project"
echo "Installing grunt-cli"
sudo npm install -g grunt-cli
echo "Done."
echo "Installing grunt"
sudo npm install grunt
echo "Done."
echo "Installing bower npm package"
sudo npm install -g bower
echo "Done."
echo "Installing bower"
bower install
echo "Done."
echo "Installing connect-liverload npm package"
sudo npm install --save-dev connect-livereload
echo "Done."
echo "Installing npm depencies"
npm install
echo "Done."
echo "Updating ruby GEM files"
gem update --system
echo "Done."
echo "Installing compass"
sudo gem install compass
echo "Done."
echo "Installing angular socket io"
bower install angular-socket-io
echo "Done"
echo "Exiting"
