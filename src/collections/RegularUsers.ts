import type { CollectionConfig } from 'payload';
import { anyone } from '../access/anyone';

export const RegularUsers: CollectionConfig = {
  slug: 'regular-users',
  auth: {
    tokenExpiration: 7200,
    verify: false,
    maxLoginAttempts: 5,
    lockTime: 600000,
    depth: 0,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      name: 'regular-user-token',
    },
  },
  access: {
    create: anyone,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'email',
    group: 'User Management',
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'user',
      required: true,
      options: [
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
    },
  ],
  timestamps: true,
};
