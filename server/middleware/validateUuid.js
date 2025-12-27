/**
 * Validate UUID v4 format in route parameters
 * @param {Object} options - Middleware options
 * @param {string} options.param - Parameter name to validate (default: 'id')
 */
export function validateUuid(options = {}) {
  const paramName = options.param || 'id';

  // UUID v4 regex
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return (req, res, next) => {
    const value = req.params[paramName];

    if (!value || !uuidRegex.test(value)) {
      return res.status(400).json({
        error: {
          code: 'INVALID_UUID',
          message: `Invalid UUID format for parameter '${paramName}'`,
          details: {
            param: paramName,
            received: value,
            expected: 'UUID v4 format'
          }
        }
      });
    }

    next();
  };
}

export default validateUuid;
