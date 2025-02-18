export const Lawyers = {
    slug: 'lawyers',
    labels: {
      singular: 'Lawyer',
      plural: 'Lawyers',
    },
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'location', type: 'text', required: true },
      { name: 'experience', type: 'number', required: true },
      { name: 'rating', type: 'number', required: true },
      { name: 'hourlyRate', type: 'text', required: true },
      { name: 'reviews', type: 'number', required: true },
      {
        name: 'specialties',
        type: 'array',
        fields: [{ name: 'specialty', type: 'text' }],
      },
    ],
  };
