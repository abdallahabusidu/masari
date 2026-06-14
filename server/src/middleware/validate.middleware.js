import { ApiError } from "../utils/ApiError.js";

// Validates a request part against a Zod schema and replaces it with parsed data.
export const validate =
  (schema, part = "body") =>
  (req, _res, next) => {
    const result = schema.safeParse(req[part]);
    if (!result.success) {
      const errors = result.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      }));
      return next(ApiError.badRequest("Validation failed", errors));
    }
    req[part] = result.data;
    next();
  };
