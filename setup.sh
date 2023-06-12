# setup.sh
# Before compiling the socwebsite, run this script to setup dependencies.
# This script reads the dependencies from the package.json file and then
# creates the node_modules directory containing the necessary dependencies.

# NOTE: make sure you have npm installed.

echo "Installing dependencies..."

npm install

echo "Install complete!"
