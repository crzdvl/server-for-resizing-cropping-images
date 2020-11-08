const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
  /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof AuthValidation
     */
  create(data) {
    return this.Joi
      .object({
        name: this.Joi
          .string()
          .min(1)
          .max(10)
          .required(),
        email: this.Joi
            .string()
            .email()
            .required(),
        password: this.Joi
            .string()
            .min(1)
            .max(30)
            .required(),
      })
      .validate(data);
  }
}

module.exports = new AuthValidation();
