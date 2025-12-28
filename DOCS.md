# Technical Documentation

> Central reference for animation systems, CSS architecture, and design patterns used in this codebase.  
> Components reference this file using `@see DOCS.md#section-name` in their JSDoc comments.

---

## Table of Contents

1. [Animation System](#animation-system)
2. [CSS Architecture](#css-architecture)
3. [Design Patterns](#design-patterns)
4. [Component Reference](#component-reference)

---

## Animation System

### Framer Motion Fundamentals

This project uses [Framer Motion](https://www.framer.com/motion/) for declarative animations.

#### Animation Types

| Type | Description | Use Case |
|------|-------------|----------|
| **spring** | Physics-based animation with `stiffness` and `damping` | Natural motion, bouncy entrances |
| **tween** | Duration-based with easing curve | Precise timing, opacity fades |
| **inertia** | Momentum-based deceleration | Drag gestures, scroll momentum |

#### Spring Physics Parameters

```javascript
transition: {
  type: "spring",
  stiffness: 50,   // Higher = faster, snappier (default: 100)
  damping: 30,     // Higher = less oscillation (default: 10)
  mass: 1,         // Higher = more inertia (default: 1)
  restDelta: 0.001 // Threshold to consider animation complete
}
```

**Common Presets:**
- **Gentle slide:** `stiffness: 50, damping: 30` - Slow, smooth entrance
- **Snappy response:** `stiffness: 200, damping: 15` - Quick, bouncy feedback
- **Overdamped:** `stiffness: 100, damping: 50` - No overshoot, direct motion

#### Easing Curves

Cubic-bezier curves for tween animations:

| Curve | Bezier | Character |
|-------|--------|-----------|
| **easeOut** | `(0, 0, 0.2, 1)` | Fast start, gentle stop |
| **easeInOut** | `(0.4, 0, 0.2, 1)` | Smooth acceleration/deceleration |
| **Apple-style** | `(0.25, 0.1, 0.25, 1)` | Subtle, refined motion |

---

### Animation Variants

Located in `src/utils/motion.js`.

#### `textVariant(delay)`
- **Transform:** `translateY(-50px) → translateY(0)`
- **Opacity:** `0 → 1`
- **Easing:** Spring with 1.8s duration
- **Use:** Hero titles, section headers

#### `fadeIn(direction, type, delay, duration)`
- **Transform:** Directional slide based on `direction` param
  - `"up"`: `translateY(100px) → translateY(0)`
  - `"down"`: `translateY(-100px) → translateY(0)`
  - `"left"`: `translateX(100px) → translateX(0)`
  - `"right"`: `translateX(-100px) → translateX(0)`
- **Use:** Content blocks, cards, grid items

#### `zoomIn(delay, duration)`
- **Transform:** `scale(0) → scale(1)`
- **Easing:** `easeOut` tween
- **Use:** Logos, icons, emphasis elements

#### `appleSlideUp(delay)`
- **Transform:** `translateY(60px) → translateY(0)`
- **Spring:** `stiffness: 50, damping: 30`
- **Use:** Premium content entrances, Apple-style reveals

#### `appleFadeBlur(delay)`
- **Filter:** `blur(10px) → blur(0px)`
- **Opacity:** `0 → 1`
- **Easing:** Apple-style cubic-bezier over 1.5s
- **Use:** Hero overlays, image reveals

#### `sectionTransition`
- **Orchestration:** `staggerChildren: 0.15s, delayChildren: 0.2s`
- **Use:** Container variant for coordinated child animations

---

### Scroll-Linked Animations

Using `useScroll` and `useTransform` from Framer Motion.

#### Scroll Progress Tracking

```javascript
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "end start"]  // [trigger start, trigger end]
});
```

**Offset Reference:**
- `"start end"` - Animation begins when element's top reaches viewport bottom
- `"end start"` - Animation ends when element's bottom passes viewport top
- `"center center"` - Element centered in viewport

#### Transform Interpolation

```javascript
// Input: scroll progress 0-1
// Output: mapped value
const opacity = useTransform(scrollYProgress, 
  [0, 0.2, 0.8, 1],  // Input breakpoints
  [0, 1, 1, 0]       // Output values
);
```

---

## CSS Architecture

### Design Tokens (CSS Custom Properties)

Defined in `src/index.css`:

```css
:root {
  /* Section backgrounds for gradient blending */
  --bg-hero: #050505;
  --bg-about: #4a4a4a;
  --bg-elite: #080808;
  --bg-sponsors: #0c0c0c;
  --bg-faq: #0a0a0a;
  --bg-footer: #242424;

  /* Easing curves */
  --transition-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  --transition-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Layout */
  --navbar-height: 5rem;  /* 4rem on tablet, 3.5rem on mobile */
}
```

---

### 3D CSS Transforms

Used in `Box.jsx` for FAQ flip cards.

#### Perspective Container

```css
.container {
  perspective: 1000px;  /* Distance from z=0 plane, affects depth intensity */
}
```

#### 3D Card Flip

```css
.card {
  transform-style: preserve-3d;  /* Enable 3D space for children */
  transition: transform 0.6s ease-in-out;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-face {
  backface-visibility: hidden;  /* Hide when facing away */
}

.card-back {
  transform: rotateY(180deg);  /* Pre-rotate back face */
}
```

---

### Minecraft Bevel Borders

Simulates 3D depth using asymmetric border colors.

```css
/* Outer frame - light on top-left, dark on bottom-right */
.minecraft-bevel {
  border: 3px solid;
  border-color: 
    #888888  /* top - highlight */
    #1a1a1a  /* right - shadow */
    #1a1a1a  /* bottom - shadow */
    #666666; /* left - mid-highlight */
}

/* Inner frame - inverted for inset effect */
.minecraft-bevel-inner {
  border: 2px solid;
  border-color:
    #2a2a2a  /* top - inner shadow */
    #555555  /* right - inner highlight */
    #555555  /* bottom - inner highlight */
    #2a2a2a; /* left - inner shadow */
}
```

---

### Glassmorphism

Used in Navbar and overlays.

```css
.glass {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);  /* Safari support */
}
```

**Properties:**
- `backdrop-filter: blur()` - Blurs content behind element
- Semi-transparent background - Allows blur to show through
- Optional: `border: 1px solid rgba(255, 255, 255, 0.1)` for edge definition

---

### GPU Compositing

Force GPU acceleration for smooth animations:

```css
.gpu-accelerated {
  transform: translateZ(0);           /* Create new compositing layer */
  backface-visibility: hidden;        /* Prevent paint flashing */
  will-change: transform, opacity;    /* Hint browser to optimize */
}
```

**Note:** Use `will-change` sparingly - too many layers degrade performance.

---

### Gradient Blending

Seamless section transitions using overlapping gradients:

```css
/* Bottom of section A */
.section-a::after {
  background: linear-gradient(to bottom, transparent, #080808);
  height: 30vh;
}

/* Top of section B */  
.section-b::before {
  background: linear-gradient(to top, transparent, #080808);
  height: 30vh;
}
```

Both gradients use the same color (`#080808`) to create seamless blend.

---

## Design Patterns

### Scroll-Triggered Visibility

Using Intersection Observer API (via `useScrollSection` hook):

```javascript
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
      setIsVisible(true);
    }
  },
  { threshold: [0.3, 0.5, 0.7] }  // Fire at 30%, 50%, 70% visibility
);
```

### Responsive Breakpoints

| Breakpoint | Tailwind Class | Use |
|------------|----------------|-----|
| 640px | `sm:` | Large phones, landscape |
| 768px | `md:` | Tablets |
| 1024px | `lg:` | Desktop |
| 1280px | `xl:` | Large desktop |

### Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Component Reference

| Component | Key Techniques | DOCS Section |
|-----------|----------------|--------------|
| `Hero.jsx` | Parallax scroll, hero sequence timing | #animation-variants |
| `Box.jsx` | 3D CSS flip card, perspective | #3d-css-transforms |
| `FlagshipEvent.jsx` | Tab UI, AnimatePresence, bevel borders | #minecraft-bevel-borders |
| `Workshops.jsx` | Card grid, stagger animations, difficulty badges | #animation-variants, #responsive-breakpoints |
| `Navbar.jsx` | Glassmorphism, scroll-triggered styling | #glassmorphism |
| `Contact.jsx` | Form validation, motion orchestration | #animation-variants |
| `Sponsors.jsx` | Poster frame styling, stagger animations | #sectiontransition |
| `Footer.jsx` | Grid layout, responsive typography | #responsive-breakpoints |

---

*Last updated: 2025-12-27*

---

## Section-Specific Documentation

### Flagship Event Section (`FlagshipEvent.jsx`)

Renamed from "Elite Events" to "Flagship Event" for better branding.

**Features:**
- Tab-based UI with left sidebar (desktop) / horizontal scroll (mobile)
- Instant tab switching with no animation lag
- Clean Minecraft-inspired borders with cyan accents
- Responsive design with mobile-first approach

**Key State:**
- `activeTab` - Controls which event details are displayed
- `scrollYProgress` - Drives entrance animation from scroll position

**Design Notes:**
- Desktop: Vertical tab stack (33% width) with detail panel (67%)
- Mobile: Horizontal scrollable tabs at top with full-width detail panel below
- Tab borders transition from gray (inactive) to cyan (active)
- Detail panel features image zoom on hover and orange CTA button

### Workshops Section (`Workshops.jsx`)

New section added between Flagship Event and Sponsors sections.

**Features:**
- Responsive grid layout (1 col mobile, 2 cols tablet, 4 cols desktop)
- Animated workshop cards with:
  - Featured image, title, and short description text
  - Smooth hover lift animations (Y-axis)
  - Cyan gradient CTA buttons
- Optional subtle background treatment behind cards (e.g., light grid pattern overlay)
- Staggered entrance animations for each card

**Card Components:**
- **Image section**: Featured image (can optionally include a gradient overlay)
- **Content section**: Title and description text
- **CTA button**: Cyan gradient with glow effect on hover

**Difficulty Level Color Guidelines (optional extension):**
If you introduce difficulty tags to workshop cards in the future, use these recommended colors:
```javascript
Beginner → Green (#22c55e)
Intermediate → Yellow (#eab308)
Advanced → Red (#ef4444)
```

**Responsive Behavior:**
- Desktop: 4-column grid with lg: breakpoint
- Tablet: 2-column grid with md: breakpoint
- Mobile: 1-column grid with full width
- Card heights adjust with responsive padding

**Animations:**
- Scroll-linked entrance (fade + slide up)
- Staggered card reveals (100ms delay between cards)
- Hover lift effect (8px Y translation)
- Scale button on hover/tap feedback

---

## Migration Notes (Elite → FlagshipEvent)

If you renamed this component locally, update these files:

1. **Import statements:**
   ```javascript
   // OLD: import Elite from "./Elite";
   import FlagshipEvent from "./FlagshipEvent";
   ```

2. **Component usage:**
   ```javascript
   // OLD: <Elite />
   <FlagshipEvent />
   ```

3. **Section IDs:** Currently uses `id="events"` - consider changing to `id="flagship"` for clarity

4. **Data structure:** Still references `isElite` property in event objects. Consider renaming to `isFlagship` for consistency (optional).
