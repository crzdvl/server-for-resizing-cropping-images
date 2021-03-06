const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class HistoryValidation extends Validation {
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
        _csrf: this.Joi
            .string()
            .required(),
      })
      .validate(data);
  }

    /**
   * @param {String} data.id - objectId
   * @returns
   * @memberof HistoryValidation
   */
    email(data) {
        return this.Joi
            .object({
                email: this.Joi
                    .string()
                    .email()
                    .required(),
                _csrf: this.Joi
                    .string()
                    .required(),
            })
            .validate(data);
    }
}

module.exports = new HistoryValidation();
