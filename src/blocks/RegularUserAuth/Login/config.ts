import type  { Block } from 'payload'

export const RegularUserLogin: Block = {
  slug: 'regularUserLogin',
  interfaceName: 'RegularUserLoginBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Regular User Login',
    },
    {
      name: 'description',
      type: 'text',
      defaultValue: 'Welcome back! Please login to your account.',
    }
  ],
}
