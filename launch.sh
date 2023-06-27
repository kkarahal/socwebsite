# launch.sh
# This file is for launching the site (and any changes) onto the cPanel host.
# Bascially, after you're done making any changes to the site, run this script.


SOCWEBSITE=`pwd`
BUILD_DIR=$SOCWEBSITE/build

USER=socialspaces
HOSTNAME=web.illinois.edu
DEST=/home/socialspaces/public_html

# STEP 1: remove build dir if it exists

echo "Cleaning..."

if [ ! -d "$BUILD_DIR" ]; then
	rm -rf "$BUILD_DIR"
fi

# STEP 2: copy build dir contents over to cPanel host.

echo "Transferring build. This may take several minutes..."

rsync -r "$BUILD_DIR/" "$USER@$HOSTNAME:$DEST"

echo "Launch complete!"
