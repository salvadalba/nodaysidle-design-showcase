/**
 * Get the nearest vibe config based on slider position
 * @param {number} sliderPosition - Current slider position (0-100)
 * @param {VibeConfig[]} vibes - Array of vibe configs
 * @returns {VibeConfig|null} Nearest vibe config
 */
export function getVibeConfig(sliderPosition, vibes) {
  if (!vibes || vibes.length === 0) {
    return null;
  }

  // Find exact match
  const exact = vibes.find(v => v.slider_position === sliderPosition);
  if (exact) return exact;

  // Handle edge cases
  if (sliderPosition <= 0) return vibes[0];
  if (sliderPosition >= 100) return vibes[vibes.length - 1];

  // Find nearest vibe
  let nearest = vibes[0];
  let minDiff = Math.abs(sliderPosition - vibes[0].slider_position);

  for (const vibe of vibes) {
    const diff = Math.abs(sliderPosition - vibe.slider_position);
    if (diff < minDiff) {
      minDiff = diff;
      nearest = vibe;
    }
  }

  return nearest;
}

/**
 * Apply theme by setting CSS custom properties
 * @param {Config} config - Vibe config object
 */
export function applyTheme(config) {
  if (!config) {
    console.warn('No config provided to applyTheme');
    return;
  }

  const root = document.documentElement;

  // Apply typography
  if (config.typography) {
    const t = config.typography;
    if (t.font_family) root.style.setProperty('--font-family', t.font_family);
    if (t.font_sizes) {
      if (t.font_sizes.h1) root.style.setProperty('--font-size-h1', t.font_sizes.h1);
      if (t.font_sizes.h2) root.style.setProperty('--font-size-h2', t.font_sizes.h2);
      if (t.font_sizes.h3) root.style.setProperty('--font-size-h3', t.font_sizes.h3);
      if (t.font_sizes.body) root.style.setProperty('--font-size-body', t.font_sizes.body);
      if (t.font_sizes.small) root.style.setProperty('--font-size-small', t.font_sizes.small);
    }
  }

  // Apply colors
  if (config.colors) {
    const c = config.colors;
    if (c.primary) root.style.setProperty('--color-primary', c.primary);
    if (c.secondary) root.style.setProperty('--color-secondary', c.secondary);
    if (c.background) root.style.setProperty('--color-bg', c.background);
    if (c.text) root.style.setProperty('--color-text', c.text);
    if (c.accent) root.style.setProperty('--color-accent', c.accent);
  }

  // Apply spacing
  if (config.spacing) {
    const s = config.spacing;
    if (s.xs) root.style.setProperty('--spacing-xs', s.xs);
    if (s.sm) root.style.setProperty('--spacing-sm', s.sm);
    if (s.md) root.style.setProperty('--spacing-md', s.md);
    if (s.lg) root.style.setProperty('--spacing-lg', s.lg);
    if (s.xl) root.style.setProperty('--spacing-xl', s.xl);
  }

  // Apply border radius
  if (config.border_radius) {
    root.style.setProperty('--border-radius', config.border_radius);
  }
}

/**
 * Interpolate between two vibe configs
 * @param {VibeConfig} vibe1 - Start vibe
 * @param {VibeConfig} vibe2 - End vibe
 * @param {number} factor - Interpolation factor (0-1)
 * @returns {Config} Interpolated config
 */
export function interpolateVibes(vibe1, vibe2, factor) {
  if (!vibe1 || !vibe2) return vibe1?.config || vibe2?.config || {};

  const c1 = vibe1.config;
  const c2 = vibe2.config;

  // Simple linear interpolation for colors (would need color library for proper interpolation)
  const lerp = (a, b, t) => {
    if (typeof a !== 'string' || typeof b !== 'string') return b;
    if (!a.startsWith('#') || !b.startsWith('#')) return t > 0.5 ? b : a;
    return t > 0.5 ? b : a; // Simplified - would use proper color interpolation
  };

  return {
    typography: c2.typography || c1.typography,
    colors: {
      primary: lerp(c1.colors?.primary, c2.colors?.primary, factor),
      secondary: lerp(c1.colors?.secondary, c2.colors?.secondary, factor),
      background: lerp(c1.colors?.background, c2.colors?.background, factor),
      text: lerp(c1.colors?.text, c2.colors?.text, factor),
      accent: lerp(c1.colors?.accent, c2.colors?.accent, factor)
    },
    spacing: c2.spacing || c1.spacing,
    border_radius: factor > 0.5 ? c2.border_radius : c1.border_radius,
    grid_columns: factor > 0.5 ? c2.grid_columns : c1.grid_columns
  };
}
