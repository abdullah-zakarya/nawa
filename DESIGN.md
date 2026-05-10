---
name: Premium Arabic Fitness
colors:
  surface: '#0e150e'
  surface-dim: '#0e150e'
  surface-bright: '#333b33'
  surface-container-lowest: '#091009'
  surface-container-low: '#161d16'
  surface-container: '#1a221a'
  surface-container-high: '#242c24'
  surface-container-highest: '#2f372e'
  on-surface: '#dce5d9'
  on-surface-variant: '#bccbb9'
  inverse-surface: '#dce5d9'
  inverse-on-surface: '#2a322a'
  outline: '#869585'
  outline-variant: '#3d4a3d'
  surface-tint: '#4ae176'
  primary: '#4be277'
  on-primary: '#003915'
  primary-container: '#22c55e'
  on-primary-container: '#004b1e'
  inverse-primary: '#006e2f'
  secondary: '#73db9a'
  on-secondary: '#00391d'
  secondary-container: '#00834b'
  on-secondary-container: '#e5ffe9'
  tertiary: '#ffb5ab'
  on-tertiary: '#60130d'
  tertiary-container: '#ff8b7c'
  on-tertiary-container: '#76231b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6bff8f'
  primary-fixed-dim: '#4ae176'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#8ff8b4'
  secondary-fixed-dim: '#73db9a'
  on-secondary-fixed: '#00210f'
  on-secondary-fixed-variant: '#00522d'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4a9'
  on-tertiary-fixed: '#410001'
  on-tertiary-fixed-variant: '#7f2a21'
  background: '#0e150e'
  on-background: '#dce5d9'
  surface-variant: '#2f372e'
typography:
  display-xl:
    fontFamily: Cairo
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  display-lg:
    fontFamily: Cairo
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Cairo
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Cairo
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Cairo
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 20px
  margin: 24px
---

## Brand & Style
The design system is engineered to evoke a sense of disciplined luxury and elite performance. It targets a high-end demographic seeking professional fitness coaching in the MENA region. The brand personality is authoritative yet encouraging, utilizing a "Dark Forest" aesthetic that suggests growth, vitality, and deep-rooted strength.

The style leverages **Modern Minimalism** with subtle **Glassmorphism** accents. By utilizing deep greens instead of pure blacks, the interface achieves a sophisticated depth that feels organic rather than synthetic. The visual language is defined by high-contrast typography, ample white space (or "dark space"), and a strict "zero-clutter" policy to ensure the user remains focused on their fitness goals.

## Colors
This design system utilizes a monochromatic forest green base to establish a premium, "pro-grade" environment. 

- **Primary & Action:** #22C55E serves as the high-energy call to action, representing growth and movement.
- **Support:** #86EFAC is used for secondary information and subtle highlights to prevent the UI from feeling overly aggressive.
- **Surface Strategy:** We use #0B1F1A for the base canvas, while #132A24 defines interactive containers and section backgrounds. This slight tonal shift creates structural hierarchy without the need for heavy borders.
- **Typography:** The text colors are tinted with green (Emerald) to ensure they feel integrated into the dark forest theme, reducing eye strain and enhancing the premium feel.

## Typography
The typography is centered around **Cairo**, a modern Arabic sans-serif that offers exceptional legibility in both display and body sizes. For numerical data and Latin fallbacks, **Lexend** is employed due to its athletic and clear character.

Information hierarchy is strictly maintained through weight and color rather than just size. Headlines use a Bold (700) weight to anchor the page, while body text uses a Regular (400) weight with generous line height to accommodate Arabic script's unique vertical requirements. All text is Right-to-Left (RTL) by default, with careful attention paid to the alignment of secondary numerical data.

## Layout & Spacing
The layout philosophy follows a **Fixed Grid** model on desktop (1200px max-width) and a fluid 4-column model on mobile devices. A 12-column grid provides the flexibility needed for complex fitness dashboards, while a standard 24px margin ensures content doesn't feel cramped against the screen edges.

The spacing rhythm is based on a 4px/8px incremental system.
- **Gutters:** 20px to provide clear separation between workout modules or stats.
- **Vertical Spacing:** Larger gaps (40px+) are used between major sections to maintain the "zero clutter" aesthetic and allow the brand's premium dark tones to breathe.

## Elevation & Depth
Depth in this design system is achieved through **Tonal Layering** and **Ambient Shadows**. 

1. **Base Layer:** #0B1F1A (The floor).
2. **Container Layer:** #132A24 (Cards and sections).
3. **Floating Layer:** Soft, diffused shadows are applied to primary cards. These shadows should use a very low-opacity black with a slight green tint (e.g., `rgba(0, 8, 5, 0.6)`) to ensure they look natural within the dark environment.
4. **Interaction Layer:** When an element is hovered or active, a subtle inner glow using #22C55E at 10% opacity can be applied to simulate a "powered-on" athletic feel.

Avoid high-contrast borders; instead, let the subtle color shifts between the background and cards define the boundaries.

## Shapes
The design system uses a **Rounded** shape language to appear modern and approachable while maintaining a professional edge.

- **Standard Containers:** Use a 16px (rounded-xl) corner radius to create a soft, premium feel for main cards and workout blocks.
- **Buttons & Inputs:** Use a 12px (rounded-lg) radius to provide a distinct, clickable appearance.
- **Status Indicators:** Use pill-shaped (fully rounded) corners for tags, chips, and progress bars to contrast against the more structured rectangular cards.

## Components

### Buttons
Primary buttons use #22C55E with #0B1F1A text for maximum legibility and "pop." They should feature a 12px corner radius. Secondary buttons should use a ghost style with a #86EFAC border or a subtle #132A24 fill.

### Cards
Cards are the workhorse of this system. They use the #132A24 background with 16px padding and 16px corner radius. In an RTL context, icons should be placed on the left, with text and primary headings starting from the right.

### Input Fields
Inputs are styled with a #132A24 fill and a subtle 1px border of #9CA3AF. On focus, the border transitions to #22C55E. Label placement is always top-right (RTL).

### Fitness-Specific Components
- **Progress Rings:** Use #22C55E for active progress and a darker #132A24 for the track.
- **Metric Chips:** Small, pill-shaped badges using #86EFAC (20% opacity) background with #86EFAC text to display stats like "Calories" or "Duration."
- **Workout Timelines:** Vertical lines should be subtle #9CA3AF, with active steps highlighted in #22C55E.