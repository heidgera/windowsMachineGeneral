#!/bin/bash

echo -e "\nInstalling node:"

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

sudo apt-get install --no-install-recommends xserver-xorg xinit xserver-xorg-video-fbdev xserver-xorg-video-fbturbo libxss1 libgconf-2-4 libnss3 git nodejs libgtk2.0-0 libxtst6

echo -e "\nClone the application"

git clone --recurse-submodules https://github.com/heidgera/windowsMachineGeneral.git

cd windowsMachineGeneral

echo -e "\nInstalling dependencies for application:"

npm i

echo -e "\nConfiguring"

cd piFig

sudo node install.js
