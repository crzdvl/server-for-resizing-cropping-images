const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class ImageValidation extends Validation {
  /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof ImageValidation
     */
  image(data) {
    return this.Joi
      .object({
        _csrf: this.Joi
            .string()
            .required(),
        width: this.Joi
          .number()
          .min(1)
          .required(),
        radios: this.Joi
            .string()
            .required(),
        height: this.Joi
          .number()
          .min(1)
          .required(),
      })
      .validate(data);
  }

  /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof ImageValidation
     */
  history(data) {
    return this.Joi
      .object({
        dateStart: this.Joi
          .string()
          .regex(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
          .required(),
        dateFinish: this.Joi
          .string()
          .regex(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
          .required(),
      })
      .validate(data);
  }
}

module.exports = new ImageValidation();
