# AnchorPoint Design System

## Color Palette

The AnchorPoint design system is based on a patriotic red/white/blue color scheme inspired by the American flag, while maintaining accessibility and modern aesthetics.

### Primary Colors
- **Primary Red**: `#B22234` - Traditional flag red
- **Primary Blue**: `#3C3B6E` - Traditional flag blue
- **Primary White**: `#FFFFFF` - Clean white

### Secondary Colors
- **Light Red**: `#D94F4F` - For hover states and accents
- **Light Blue**: `#5A5A99` - For secondary actions
- **Dark Blue**: `#2C2B4E` - For contrast and depth

### Neutral Grayscale
- **Gray 50**: `#F8F9FA` - Backgrounds
- **Gray 100**: `#F1F3F5` - Cards, containers
- **Gray 200**: `#E9ECEF` - Borders
- **Gray 300**: `#DEE2E6` - Dividers
- **Gray 400**: `#CED4DA` - Disabled states
- **Gray 500**: `#ADB5BD` - Subtle text
- **Gray 600**: `#868E96` - Body text
- **Gray 700**: `#495057` - Headings
- **Gray 800**: `#343A40` - Emphasis text
- **Gray 900**: `#212529` - High contrast text

## Typography

### Font Family
- **Primary**: `var(--font-sans)` - System stack with fallbacks
- **Monospace**: `var(--font-mono)` - For code and technical content

### Font Sizes
- **Display**: 48px+ (Headlines)
- **Heading 1**: 36px
- **Heading 2**: 28px
- **Heading 3**: 24px
- **Body Large**: 18px
- **Body Regular**: 16px
- **Body Small**: 14px
- **Caption**: 12px

## Spacing System

Based on an 8px grid:
- **XXS**: 4px
- **XS**: 8px
- **S**: 16px
- **M**: 24px
- **L**: 32px
- **XL**: 48px
- **XXL**: 64px

## Component Design

### Buttons
- **Primary**: Blue background with white text
- **Secondary**: Red background with white text
- **Tertiary**: White background with blue text and border
- **Hover States**: Lighter variants of primary colors
- **Border Radius**: 6px

### Cards
- **Background**: White or Gray 100
- **Border**: Subtle Gray 200
- **Border Radius**: 8px
- **Shadow**: Subtle elevation
- **Accent Border**: 4px top border in primary colors

### Navigation
- **Header**: White background with red accent border (bottom)
- **Footer**: Light gray background with blue accent border (top)
- **Links**: Blue text with blue hover state

## Accessibility

### Color Contrast
All color combinations meet WCAG 2.1 AA standards:
- Text and background: Minimum 4.5:1 contrast ratio
- Large text: Minimum 3:1 contrast ratio
- UI components: Minimum 3:1 contrast ratio

### Focus States
- All interactive elements have visible focus indicators
- Focus ring: 2px solid blue with 2px offset

## Implementation

### CSS Custom Properties
All colors are defined as CSS custom properties in `src/styles/globals.css`:
```css
:root {
  --primary-red: #B22234;
  --primary-blue: #3C3B6E;
  --primary-white: #FFFFFF;
  /* ... other variables */
}
```

### Usage in Components
Colors should be applied using the custom properties:
```jsx
<button className="bg-[--primary-blue] text-[--primary-white] hover:bg-[--secondary-blue-light]">
  Click Me
</button>
```

## Visual Language Summary

The AnchorPoint visual language combines patriotic elements with modern UI principles:
1. **Patriotic Foundation**: Red, white, and blue color scheme that evokes American pride
2. **Modern Aesthetic**: Clean lines, subtle shadows, and ample whitespace
3. **Military Spouse Focus**: Design that feels supportive and understanding
4. **Accessibility First**: High contrast ratios and clear visual hierarchy
5. **Responsive Design**: Works beautifully on all device sizes
6. **Emotional Consideration**: Calming colors that reduce stress during PCS moves

This design system ensures consistency across all AnchorPoint interfaces while maintaining a strong connection to American values and military community identity.
