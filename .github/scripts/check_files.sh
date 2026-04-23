#!/bin/bash

# Required files for Unit 02: Typed Arrays
FILES=("parser.js" "index.html" "style.css")

echo "🔍 Checking for required project files..."

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        if [ -s "$file" ]; then
            echo "✅ $file exists and is not empty."
        else
            echo "❌ $file is empty!"
            exit 1
        fi
    else
        echo "❌ $file is missing!"
        exit 1
    fi
done

echo "🎉 All required files are present."
exit 0
