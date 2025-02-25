import type { Block } from 'payload'

export const LoginSignup: Block = {
  slug: 'loginSignup',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Login or Sign Up',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Join our community of legal professionals and clients.',
    },
  ],
  interfaceName: 'LoginSignupBlock',
}
