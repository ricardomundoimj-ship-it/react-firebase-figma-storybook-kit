#!/usr/bin/env node

/**
 * Design Token Synchronizer
 * 
 * This script simulates the Figma-to-code synchronization process.
 * In a real implementation, this would be called by Cursor MCP plugin
 * when design tokens change in Figma.
 */

const { writeFileSync, existsSync } = require('fs');
const { join } = require('path');
const { designTokens, generateCSSVariables, generateTailwindConfig } = require('../src/tokens/index.js');

const OUTPUT_DIR = './src/generated';
const CSS_OUTPUT = join(OUTPUT_DIR, 'tokens.css');
const TAILWIND_OUTPUT = join(OUTPUT_DIR, 'tailwind.tokens.js');

function ensureDirectoryExists(filePath) {
  const dir = filePath.substring(0, filePath.lastIndexOf('/'));
  if (!existsSync(dir)) {
    require('fs').mkdirSync(dir, { recursive: true });
  }
}

function generateTokens() {
  console.log('🎨 Generating design tokens from Figma...');
  
  // Generate CSS variables
  const cssVariables = generateCSSVariables(designTokens);
  ensureDirectoryExists(CSS_OUTPUT);
  writeFileSync(CSS_OUTPUT, cssVariables);
  console.log('✅ Generated CSS variables:', CSS_OUTPUT);
  
  // Generate Tailwind config extension
  const tailwindConfig = generateTailwindConfig(designTokens);
  const tailwindOutput = `// Auto-generated from Figma design tokens
// Do not edit manually - this will be overwritten by sync

module.exports = ${JSON.stringify(tailwindConfig, null, 2)};
`;
  ensureDirectoryExists(TAILWIND_OUTPUT);
  writeFileSync(TAILWIND_OUTPUT, tailwindOutput);
  console.log('✅ Generated Tailwind config:', TAILWIND_OUTPUT);
  
  // Generate a token registry for programmatic access
  const registryOutput = join(OUTPUT_DIR, 'token-registry.js');
  const registryContent = `// Auto-generated token registry for programmatic access
const { designTokens } = require('../tokens/index.js');

const colorTokens = designTokens.colors;
const typographyTokens = designTokens.typography;
const spacingTokens = designTokens.spacing;
const shadowTokens = designTokens.shadows;

function getToken(type, path) {
  const keys = path.split('.');
  let value = designTokens[type];
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  return value;
}

function getColor(name, shade) {
  return designTokens.colors[name]?.[shade];
}

function getSpacing(size) {
  return designTokens.spacing.spacing[size];
}

function getFontSize(size) {
  return designTokens.typography.fontSizes[size];
}

function getShadow(name) {
  return designTokens.shadows.shadows[name]?.value || designTokens.shadows.shadows[name];
}

module.exports = {
  colorTokens,
  typographyTokens,
  spacingTokens,
  shadowTokens,
  getToken,
  getColor,
  getSpacing,
  getFontSize,
  getShadow,
  designTokens
};
`;
  writeFileSync(registryOutput, registryContent);
  console.log('✅ Generated token registry:', registryOutput);
  
  console.log('🎉 Design token synchronization complete!');
}

function watchForChanges() {
  if (process.argv.includes('--watch')) {
    console.log('👀 Watching for design token changes...');
    console.log('Note: In production, this would be handled by Cursor MCP plugin');
    
    // Simulate periodic checks (in real implementation, this would be event-driven)
    setInterval(() => {
      // This would be triggered by Figma changes via Cursor MCP
      console.log('🔄 Checking for Figma updates...');
    }, 30000); // Check every 30 seconds
  }
}

// Main execution
if (require.main === module) {
  generateTokens();
  watchForChanges();
}

module.exports = { generateTokens };