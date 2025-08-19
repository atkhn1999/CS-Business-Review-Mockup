#!/bin/bash

# Fix React imports in all TypeScript files
find . -name "*.tsx" -not -path "./node_modules/*" -not -path "./.next/*" | while read file; do
  # Replace useState, useEffect, useRef imports
  sed -i "s/import { useState } from 'react';/import * as React from 'react';/g" "$file"
  sed -i "s/import { useRef } from 'react';/import * as React from 'react';/g" "$file"
  sed -i "s/import { useState, useEffect } from 'react';/import * as React from 'react';/g" "$file"
  
  # Replace hook usage
  sed -i "s/useState(/React.useState(/g" "$file"
  sed -i "s/useEffect(/React.useEffect(/g" "$file"
  sed -i "s/useRef(/React.useRef(/g" "$file"
done

echo "Fixed React imports!"