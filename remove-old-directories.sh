#!/bin/bash

# Script to remove old directories

echo "This script will remove the old directories."
echo "Make sure you've tested the application and everything works before running this script."
echo "Press Enter to continue or Ctrl+C to cancel..."
read

echo "Removing old directories..."

# Remove old directories
rm -rf src/components
rm -rf src/hooks
rm -rf src/utils

echo "Old directories removed successfully!"
