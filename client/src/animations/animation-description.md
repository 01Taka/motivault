# Animation Functions

## 1. **Pulse Animation** (`createPulseAnimation`)

### Description

Creates a pulse animation that scales the element up and down. Useful for interactive UI elements that need emphasis.

### Options

- **scaleAmount**: The scale factor to enlarge the element (Default: `1.03`)
- **duration**: Total duration of the animation (Default: `'2s'`)
- **timingFunction**: The easing curve for the animation (Default: `'ease-in-out'`)
- **iterationCount**: The number of times the animation repeats (Default: `'infinite'`)

---

## 2. **Float Animation** (`createFloatAnimation`)

### Description

Creates a floating animation that moves the element up and down, giving it a lightweight, airy effect.

### Options

- **translateYAmount**: The number of pixels the element moves up and down (Default: `3`)
- **duration**: Total duration of the animation (Default: `'3s'`)
- **timingFunction**: The easing curve for the animation (Default: `'ease-in-out'`)
- **iterationCount**: The number of times the animation repeats (Default: `'infinite'`)

---

## 3. **Fade In From Bottom Animation** (`createFadeInFromBottomAnimation`)

### Description

Creates an animation where the element fades in from the bottom, making it ideal for elements appearing on scroll or page load.

### Options

- **translateYStartAmount**: The initial amount of translation from the bottom (Default: `20`)
- **duration**: Total duration of the animation (Default: `'1s'`)
- **timingFunction**: The easing curve for the animation (Default: `'ease-out'`)

---

## 4. **Fade In Animation** (`createFadeInAnimation`)

### Description

Creates a simple fade-in effect, where the element fades into view.

### Options

- **duration**: Total duration of the animation (Default: `'0.5s'`)
- **timingFunction**: The easing curve for the animation (Default: `'ease-out'`)

---

## 5. **Fade Out Animation** (`createFadeOutAnimation`)

### Description

Creates a fade-out effect, where the element gradually disappears.

### Options

- **duration**: Total duration of the animation (Default: `'0.5s'`)
- **timingFunction**: The easing curve for the animation (Default: `'ease-in'`)

---

## 6. **Shake Animation** (`createShakeAnimation`)

### Description

Creates a shaking effect, often used to draw attention or indicate an error.

### Options

- **distance**: The distance in pixels the element shakes horizontally (Default: `8`)
- **duration**: Total duration of the animation (Default: `'0.4s'`)
- **timingFunction**: The easing curve for the animation (Default: `'ease-in-out'`)
- **iterationCount**: The number of times the animation repeats (Default: `1`)

---

## 7. **Slide In Animation** (`createSlideInAnimation`)

### Description

Creates a sliding effect where the element enters the screen from one of the specified directions.

### Options

- **direction**: The direction from which the element slides (`'left'`, `'right'`, `'top'`, `'bottom'`) (Default: `'left'`)
- **distance**: The distance the element moves (e.g., `'100px'`, `'100%'`) (Default: `'100%'`)
- **duration**: Total duration of the animation (Default: `'0.5s'`)
- **timingFunction**: The easing curve for the animation (Default: `'ease-out'`)

---

## 8. **Rotate Animation** (`createRotateAnimation`)

### Description

Creates a rotation animation, often used for loading spinners or rotating icons.

### Options

- **duration**: Total duration of the animation (Default: `'1s'`)
- **timingFunction**: The easing curve for the animation (Default: `'linear'`)
- **iterationCount**: The number of times the animation repeats (Default: `'infinite'`)

---
