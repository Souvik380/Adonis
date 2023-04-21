import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


const mobileRegex = /^[0-9]{10}$/

export default class UserProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

        public schema = schema.create({
            name: schema.string({},[rules.minLength(3),rules.maxLength(30)]),
            
            mobile: schema.string({}, [
              rules.required(),
              rules.regex(mobileRegex),
              rules.minLength(10),
              rules.maxLength(10),
              rules.unique({ table: 'profiles', column: 'mobile' }),
            ]),

            gender: schema.enum(['MALE', 'FEMALE'], [
              rules.required()
            ]),

            dob:schema.date()
      })

  public messages: CustomMessages = {}
}
