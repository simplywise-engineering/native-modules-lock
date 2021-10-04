#!/bin/bash

# Restore repo state
git restore --staged integration-tests/
git clean --force integration-tests/

# Clean up integration-tests node_modules/
rm -rf integration-tests/**/node_modules