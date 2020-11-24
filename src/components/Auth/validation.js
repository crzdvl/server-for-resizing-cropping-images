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
        firstName: this.Joi
          .string()
          .min(1)
          .max(10)
          .required(),
        lastName: this.Joi
            .string()
            .min(1)
            .max(15)
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
        _csrf: this.Joi
              .string()
              .required(),
      })
      .validate(data);
  }

    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof AuthValidation
     */
    login(data) {
        return this.Joi
            .object({
                email: this.Joi
                    .string()
                    .email()
                    .required(),
                password: this.Joi
                    .string()
                    .min(1)
                    .max(30)
                    .required(),
                _csrf: this.Joi
                    .string()
                    .required(),
            })
            .validate(data);
    }
}

module.exports = new AuthValidation();
