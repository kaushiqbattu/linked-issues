#!/bin/bash

echo "Starting Linked Issues Validator Development Server"
echo "=================================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the server
echo "Starting server on http://localhost:3000"
echo "Available endpoints:"
echo "  - http://localhost:3000/create.html (Configuration page)"
echo "  - http://localhost:3000/view.html (View configuration page)"
echo "  - http://localhost:3000/health (Health check)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start 