import type { CollectionConfig } from 'payload';
import { authenticated } from '../access/authenticated';
import { anyone } from '../access/anyone';

export const RegularUsers: CollectionConfig = {
  slug: 'regular-users',
  auth: {
    verify: false, // Changed to false for testing
    tokenExpiration: 7200, // 2 hours
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 minutes
    useAPIKey: false,
    depth: 1,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
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
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'resetPasswordToken',
      type: 'text',
      hidden: true,
    },
    {
      name: 'resetPasswordExpiration',
      type: 'date',
      hidden: true,
    },
    {
      name: 'loginAttempts',
      type: 'number',
      hidden: true,
    },
    {
      name: 'lockUntil',
      type: 'date',
      hidden: true,
    },
    {
      name: 'password',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'user',
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
    {
      name: 'isVerified',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
};
