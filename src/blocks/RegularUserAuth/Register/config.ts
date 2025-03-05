import { Block } from 'payload/types'

export const RegularUserRegister: Block = {
  slug: 'regularUserRegister',
  interfaceName: 'RegularUserRegisterBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Create Your Account',
    },
    {
      name: 'description',
      type: 'text',
      defaultValue: 'Join us to get started.',
    },
  ],
}
