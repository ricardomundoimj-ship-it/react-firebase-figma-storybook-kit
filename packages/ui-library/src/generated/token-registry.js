// Auto-generated token registry for programmatic access
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
