import type { CollectionConfig } from 'payload';

import { authenticated } from '../../../access/authenticated';

export const LawyersProfile: CollectionConfig = {
  labels: {
    singular: 'Lawyer Profile',
    plural: 'Lawyers Profile',
  },
  slug: 'lawyers-profile',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: ()=> true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['full_name', 'email', 'designation'],
    useAsTitle: 'full_name',
  },
  fields: [
    {
      name: 'profile_picture',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'full_name',
      type: 'text',
      required: true,
    },
    {
      name: 'designation',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'country', type: 'text', required: true },
        { name: 'division', type: 'text', required: true },
        { name: 'district', type: 'text', required: true },
        { name: 'upazila', type: 'text', required: true },
      ],
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'mobile_number',
      type: 'text',
      required: true,
    },
    {
      name: 'years_of_experience',
      type: 'number',
      required: true,
    },
    {
      name: 'specialization',
      type: 'array',
      fields: [
        { name: 'field', type: 'text' },
      ],
    },
    {
      name: 'availability',
      type: 'array',
      fields: [
        { name: 'date', type: 'date', required: true },
        { name: 'time', type: 'text', required: true },
      ],
    },
  ],
  timestamps: true,
};
