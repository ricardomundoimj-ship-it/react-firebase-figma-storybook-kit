const semanticColors = require('./colors/semantic.json');
const typographyTokens = require('./typography/typography.json');
const spacingTokens = require('./spacing/spacing.json');
const shadowTokens = require('./shadows/effects.json');

const designTokens = {
  colors: semanticColors,
  typography: typographyTokens,
  spacing: spacingTokens,
  shadows: shadowTokens,
};

function generateCSSVariables(tokens) {
  const cssVars = [];

  // Generate color variables
  Object.entries(tokens.colors).forEach(([colorName, colorShades]) => {
    Object.entries(colorShades).forEach(([shade, value]) => {
      cssVars.push(`  --color-${colorName}-${shade}: ${value};`);
    });
  });

  // Generate typography variables
  Object.entries(tokens.typography.fontSizes).forEach(([size, config]) => {
    const value = typeof config === 'string' ? config : config.value;
    const lineHeight = typeof config === 'string' ? '1.5' : config.lineHeight;
    cssVars.push(`  --font-size-${size}: ${value};`);
    cssVars.push(`  --line-height-${size}: ${lineHeight};`);
  });

  Object.entries(tokens.typography.fontWeights).forEach(([weight, value]) => {
    cssVars.push(`  --font-weight-${weight}: ${value};`);
  });

  // Generate spacing variables
  Object.entries(tokens.spacing.spacing).forEach(([size, value]) => {
    cssVars.push(`  --spacing-${size}: ${value};`);
  });

  Object.entries(tokens.spacing.borderRadius).forEach(([size, value]) => {
    cssVars.push(`  --radius-${size}: ${value};`);
  });

  // Generate shadow variables
  Object.entries(tokens.shadows.shadows).forEach(([name, config]) => {
    const value = typeof config === 'string' ? config : config.value;
    cssVars.push(`  --shadow-${name}: ${value};`);
  });

  return `:root {\n${cssVars.join('\n')}\n}`;
}

function generateTailwindConfig(tokens) {
  const colors = {};
  
  // Convert colors for Tailwind
  Object.entries(tokens.colors).forEach(([colorName, colorShades]) => {
    colors[colorName] = {};
    Object.entries(colorShades).forEach(([shade, value]) => {
      colors[colorName][shade] = value;
    });
  });

  return {
    theme: {
      extend: {
        colors,
        fontFamily: tokens.typography.fontFamilies,
        fontSize: tokens.typography.fontSizes,
        fontWeight: tokens.typography.fontWeights,
        spacing: tokens.spacing.spacing,
        borderRadius: tokens.spacing.borderRadius,
        boxShadow: tokens.shadows.shadows,
        opacity: tokens.shadows.opacity,
      },
    },
  };
}

function generateTypeScriptTypes(tokens) {
  return `
export type ColorName = ${Object.keys(tokens.colors).map(name => `'${name}'`).join(' | ')};
export type ColorShade = ${Object.values(tokens.colors).flatMap(shades => 
  Object.keys(shades)
).filter((shade, index, arr) => arr.indexOf(shade) === index).map(shade => `'${shade}'`).join(' | ')};

export type FontSize = ${Object.keys(tokens.typography.fontSizes).map(size => `'${size}'`).join(' | ')};
export type FontWeight = ${Object.keys(tokens.typography.fontWeights).map(weight => `'${weight}'`).join(' | ')};
export type Spacing = ${Object.keys(tokens.spacing.spacing).map(size => `'${size}'`).join(' | ')};
export type BorderRadius = ${Object.keys(tokens.spacing.borderRadius).map(size => `'${size}'`).join(' | ')};
export type Shadow = ${Object.keys(tokens.shadows.shadows).map(name => `'${name}'`).join(' | ')};

export interface DesignTokenValue {
  colors: {
    [key in ColorName]: {
      [key in ColorShade]: string;
    };
  };
  typography: {
    fontSizes: {
      [key in FontSize]: {
        value: string;
        lineHeight: string;
      };
    };
    fontWeights: {
      [key in FontWeight]: string;
    };
  };
  spacing: {
    spacing: {
      [key in Spacing]: string;
    };
    borderRadius: {
      [key in BorderRadius]: string;
    };
  };
  shadows: {
    shadows: {
      [key in Shadow]: string;
    };
  };
}
  `.trim();
}

module.exports = {
  designTokens,
  generateCSSVariables,
  generateTailwindConfig,
  generateTypeScriptTypes,
};