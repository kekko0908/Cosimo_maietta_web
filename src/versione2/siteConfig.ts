// Preview defaults are deliberately kept here, away from page copy.
export const siteConfig = {
  name: 'Cosimo Maietta',
  label: 'Photographer.cosimomaietta',
  url: import.meta.env.VITE_SITE_URL || 'https://photographer.cosimomaietta.example',
  preview: import.meta.env.VITE_PREVIEW_MODE !== 'false',
  contactEndpoint: import.meta.env.VITE_CONTACT_API_URL || '',
  interview: {
    src: import.meta.env.VITE_INTERVIEW_URL || '/media/video/sguardi-anteprima.mp4',
    captions:
      import.meta.env.VITE_INTERVIEW_CAPTIONS_URL ||
      (import.meta.env.VITE_INTERVIEW_URL ? '' : '/media/video/sguardi-anteprima.vtt'),
    isPreview: !import.meta.env.VITE_INTERVIEW_URL,
  },
  professionalLinks: [
    { label: 'ProntoPro', href: import.meta.env.VITE_PRONTOPRO_URL || 'https://www.prontopro.it/' },
    {
      label: 'StarOfService',
      href: import.meta.env.VITE_STAROFSERVICE_URL || 'https://www.starofservice.it/',
    },
  ],
};
