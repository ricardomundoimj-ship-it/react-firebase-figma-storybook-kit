# Figma-Cursor Design Token Integration

This directory contains the setup for synchronizing design tokens from Figma to the component library using Cursor's MCP plugin.

## 🎯 Overview

The integration provides:

- **Automatic token sync**: Design tokens from Figma are automatically converted to code
- **Multiple output formats**: CSS variables, Tailwind config, TypeScript types
- **Real-time updates**: Changes in Figma are reflected immediately in the codebase
- **Version control**: Token changes are tracked and can be reverted

## 📁 Directory Structure

```
src/tokens/
├── colors/
│   └── semantic.json     # Color tokens from Figma
├── typography/
│   └── typography.json   # Typography tokens
├── spacing/
│   └── spacing.json      # Spacing and sizing tokens
├── shadows/
│   └── effects.json      # Shadow and effect tokens
└── index.ts              # Token transformation utilities

scripts/
└── sync-tokens.js        # Token synchronization script

src/generated/            # Auto-generated files (don't edit manually)
├── tokens.css            # CSS variables
├── tailwind.tokens.js    # Tailwind config extension
└── token-registry.js     # Programmatic token access
```

## 🚀 Setup Instructions

### 1. Configure Figma Integration

Edit `figma-sync.config.json`:

```json
{
  "figma": {
    "fileId": "YOUR_FIGMA_FILE_ID",
    "apiKey": "YOUR_FIGMA_API_KEY",
    "teamId": "YOUR_TEAM_ID"
  }
}
```

### 2. Enable Cursor MCP Plugin

1. Open Cursor settings
2. Navigate to Extensions/MCP
3. Enable the Figma plugin
4. Configure the file mappings to point to `src/tokens/`

### 3. Manual Token Sync (for testing)

```bash
npm run tokens:sync
```

### 4. Watch for Changes (development)

```bash
npm run tokens:watch
```

## 🔄 Synchronization Process

1. **Design changes in Figma**: Designer updates color, typography, or spacing variables
2. **Cursor MCP detects changes**: The plugin monitors the Figma file
3. **Token extraction**: Variables are extracted and saved as JSON files in `src/tokens/`
4. **Transformation**: Tokens are converted to multiple formats
5. **Build integration**: Changes trigger automatic rebuild and Storybook refresh

## 📊 Token Formats

### Input (from Figma)
```json
{
  "primary": {
    "500": "#3b82f6",
    "600": "#2563eb"
  }
}
```

### Output - CSS Variables
```css
:root {
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
}
```

### Output - Tailwind Config
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3b82f6',
          600: '#2563eb'
        }
      }
    }
  }
}
```

## 🛠️ Development Workflow

### Designers
1. Create/update variables in Figma
2. Organize variables in collections (Colors, Typography, etc.)
3. Publish changes

### Developers
1. Changes sync automatically (or run `npm run tokens:sync`)
2. Use tokens in components:
   ```jsx
   import { getColor } from '../generated/token-registry';
   
   const Button = styled.button`
     background: ${getColor('primary', '500')};
   `;
   ```
3. Test changes in Storybook

## 🔧 Configuration Options

### Token Mappings
Configure which Figma collections map to which output files:

```json
{
  "mappings": {
    "colors": {
      "figmaVariableCollections": ["Colors", "Brand Colors"],
      "outputFile": "./src/tokens/colors/semantic.json"
    }
  }
}
```

### Output Formats
Enable/disable specific output formats:

```json
{
  "transformers": {
    "css": { "enabled": true },
    "tailwind": { "enabled": true },
    "typescript": { "enabled": true }
  }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Tokens not syncing**: Check Cursor MCP plugin configuration
2. **Build errors**: Ensure token JSON files are valid
3. **Missing tokens**: Verify Figma collections are properly named

### Debug Commands

```bash
# Check current tokens
npm run tokens:sync

# Validate token files
node -e "console.log(JSON.stringify(require('./src/tokens/index.ts').designTokens, null, 2))"

# Test transformation
node -e "console.log(require('./src/tokens/index.ts').generateCSSVariables(require('./src/tokens/index.ts').designTokens))"
```

## 📚 Additional Resources

- [Figma Variables Documentation](https://help.figma.com/hc/en-us/articles/12463658394361)
- [Cursor MCP Plugin Documentation](https://cursor.sh/docs/mcp)
- [Design Systems Best Practices](https://designsystems.com/)