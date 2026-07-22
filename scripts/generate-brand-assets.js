import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const brandDir = path.join(rootDir, 'frontend', 'public', 'brand');
const docsDir = path.join(rootDir, 'docs');

// Ensure brand directory exists
if (!fs.existsSync(brandDir)) {
  fs.mkdirSync(brandDir, { recursive: true });
}
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

console.log('🚀 Kaizen Q — Brand Asset Verification & Token Generator');

// Brand Design System Tokens JSON
const brandTokens = {
  brandName: 'Kaizen Q',
  tagline: 'AI-POWERED LMS',
  personality: [
    'Professional',
    'Premium',
    'Modern',
    'Minimal',
    'AI-Driven',
    'Innovative',
    'Elegant',
    'Future-Ready',
  ],
  colors: {
    primary: {
      hex: '#0B1220',
      name: 'Deep Navy',
      usage: 'Brand Container, Dark Theme Backgrounds, High-Contrast Typography',
    },
    gradient: {
      start: '#2563EB',
      startName: 'Royal Blue',
      end: '#22D3EE',
      endName: 'Electric Cyan',
      direction: '135deg (Linear)',
      usage: 'Logo Symbol Vector Fill, Wordmark Q Accent, Interactive Buttons',
    },
    accentGlow: {
      hex: 'rgba(34, 211, 238, 0.25)',
      name: 'Soft Electric Blue',
      usage: 'Glassmorphic Outer Glow & Rim Highlights',
    },
    background: {
      light: '#FFFFFF',
      dark: '#0B1220',
    },
  },
  typography: {
    fontFamily: 'Sora, sans-serif',
    googleFontUrl:
      'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap',
    weights: {
      wordmark: 800,
      heading: 700,
      body: 400,
      tagline: 600,
    },
    letterSpacing: {
      wordmark: '-0.02em',
      tagline: '+0.28em (Uppercase)',
    },
  },
  deliverables: [
    'logo-full-light.svg',
    'logo-full-dark.svg',
    'logo-vertical-light.svg',
    'logo-vertical-dark.svg',
    'icon-only.svg',
    'app-icon-1024.svg',
    'favicon.svg',
  ],
};

// Write brand-tokens.json
const tokenPath = path.join(docsDir, 'kaizen-q-brand-tokens.json');
fs.writeFileSync(tokenPath, JSON.stringify(brandTokens, null, 2), 'utf-8');
console.log(`✅ Exported Brand Tokens to ${tokenPath}`);

// Generate Brand Identity Specification Markdown File
const brandSpecMarkdown = `# Kaizen Q — Brand Identity Specification System

## Brand Personality & Strategy
**Kaizen Q** is a world-class AI-powered Learning Management System built for continuous improvement, innovation, and digital transformation.

- **Personality**: Professional, Premium, Modern, Minimal, AI-Driven, Innovative, Elegant, Future-Ready.
- **Visual Style**: Ultra Minimal, Flat Modern Design, Apple Simplicity, Linear.app Precision, OpenAI Cleanliness, Vercel Minimalism.

---

## Logo Symbol Anatomy (K + Q Geometry)
1. **Circular Q**: Continuous learning, infinite feedback loops, and the Kaizen philosophy.
2. **Integrated K**: Natural geometric 45° diagonal vectors inside the Q representing Knowledge and Kaizen foundation.
3. **Hidden Upward Arrow ($\\uparrow$)**: Sleek chevron at top-right apex symbolizing skill growth, career elevation, and future-readiness.
4. **AI Micro Circuit Nodes**: Precision glowing cyan nodes ($r=4px$) along key vector junctions representing neural intelligence and digital transformation.

---

## Color Palette Tokens
| Token Name | HEX Code | RGB | Role / Usage |
| :--- | :--- | :--- | :--- |
| **Primary Navy** | \`#0B1220\` | \`rgb(11, 18, 32)\` | Deep Navy Canvas, Dark Mode UI, High Contrast Text |
| **Royal Blue** | \`#2563EB\` | \`rgb(37, 99, 235)\` | Symbol Gradient Start, Key Actions |
| **Electric Cyan** | \`#22D3EE\` | \`rgb(34, 211, 238)\` | Symbol Gradient End, AI Micro-nodes |
| **Accent Glow** | \`rgba(34, 211, 238, 0.25)\` | Soft Electric Glow | Glassmorphic Outer Rim Highlight |
| **Light Canvas** | \`#FFFFFF\` | \`rgb(255, 255, 255)\` | Pure White Background, Light Mode UI |

---

## Typography Guidelines
- **Typeface**: Google Font **Sora** (\`font-family: 'Sora', sans-serif\`)
- **Wordmark Styling**: ExtraBold (\`weight: 800\`), kerning \`-0.02em\`
- **Tagline Styling**: SemiBold (\`weight: 600\`), letter-spacing \`+0.28em\` uppercase

---

## Deliverables Summary
All SVG vector files are vector-perfect, infinitely scalable, and optimized for print, web, iOS, and Android:
1. \`logo-full-light.svg\` — Full Horizontal Logo (Light Backgrounds)
2. \`logo-full-dark.svg\` — Full Horizontal Logo (Dark Backgrounds)
3. \`logo-vertical-light.svg\` — Stacked Vertical Logo (Light Theme)
4. \`logo-vertical-dark.svg\` — Stacked Vertical Logo (Dark Theme)
5. \`icon-only.svg\` — Standalone K+Q Vector Symbol
6. \`app-icon-1024.svg\` — 1024x1024 iOS/macOS Glassmorphic App Icon
7. \`favicon.svg\` — 32x32 Browser Favicon
`;

const specPath = path.join(docsDir, 'kaizen-q-brand-spec.md');
fs.writeFileSync(specPath, brandSpecMarkdown, 'utf-8');
console.log(`✅ Exported Brand Specification Markdown to ${specPath}`);

// Verify all brand files exist
console.log('\n📦 Verifying Brand Asset Deliverables:');
let allExist = true;
brandTokens.deliverables.forEach((file) => {
  const filePath =
    file === 'favicon.svg'
      ? path.join(rootDir, 'frontend', 'public', file)
      : path.join(brandDir, file);

  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`  ✓ ${file} (${stats.size} bytes)`);
  } else {
    console.error(`  ✕ MISSING: ${file}`);
    allExist = false;
  }
});

if (allExist) {
  console.log('\n🎉 ALL KAIZEN Q BRAND ASSETS VERIFIED SUCCESSFULLY!');
} else {
  process.exit(1);
}
