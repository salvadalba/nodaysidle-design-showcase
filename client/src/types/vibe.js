/**
 * @typedef {Object} Typography
 * @property {string} font_family
 * @property {Object} font_sizes
 * @property {string} font_sizes.h1
 * @property {string} font_sizes.h2
 * @property {string} font_sizes.h3
 * @property {string} font_sizes.body
 * @property {string} font_sizes.small
 */

/**
 * @typedef {Object} Colors
 * @property {string} primary
 * @property {string} secondary
 * @property {string} background
 * @property {string} text
 * @property {string} accent
 */

/**
 * @typedef {Object} Spacing
 * @property {string} xs
 * @property {string} sm
 * @property {string} md
 * @property {string} lg
 * @property {string} xl
 */

/**
 * @typedef {Object} Config
 * @property {Typography} typography
 * @property {Colors} colors
 * @property {Spacing} spacing
 * @property {string} border_radius
 * @property {number} grid_columns
 */

/**
 * @typedef {Object} VibeConfig
 * @property {string} id
 * @property {string} name
 * @property {number} slider_position
 * @property {Config} config
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} [thumbnail_url]
 * @property {string[]} images
 * @property {string[]} tags
 * @property {string} [content]
 * @property {boolean} featured
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} CaseStudy
 * @property {string} id
 * @property {string} project_id
 * @property {string} title
 * @property {string} description
 * @property {string} challenge
 * @property {string} solution
 * @property {string} results
 * @property {number} order_index
 * @property {string} [project_title]
 * @property {string} [project_thumbnail]
 */

/**
 * @typedef {Object} About
 * @property {string} name
 * @property {string} bio
 * @property {string[]} skills
 * @property {Experience[]} experience
 * @property {SocialLinks} social_links
 */

/**
 * @typedef {Object} Experience
 * @property {string} title
 * @property {string} company
 * @property {string} period
 * @property {string} description
 */

/**
 * @typedef {Object} SocialLinks
 * @property {string} email
 * @property {string} github
 * @property {string} linkedin
 * @property {string} twitter
 * @property {string} dribbble
 */

export {};
