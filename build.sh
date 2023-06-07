# build.sh
# This script is for creating production build of socwebsite. Run this script before launching with launch.sh.

# NOTE: make sure you have npm installed and that you've run setup.sh.

echo "Building..."

npm run build

echo "Build complete! Ready to launch."
