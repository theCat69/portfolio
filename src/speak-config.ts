import type { SpeakConfig } from 'qwik-speak';

export const supportedLocals = [
  { lang: 'en-US', langIso2: 'en', currency: 'USD', timeZone: 'America/Chicago' },
  { lang: 'fr-FR', langIso2: 'fr', currency: 'EUR', timeZone: 'Europe/Rome' },
  { lang: 'en-EN', langIso2: 'en', currency: 'EUR', timeZone: 'Europe/Rome' }
];

const defaultLocale = supportedLocals.filter(locale => locale.lang === 'en-EN')[0];

export const config: SpeakConfig = {
  defaultLocale: defaultLocale,
  supportedLocales: supportedLocals,
  assets: [
    'app',
    'hero',
    'skill',
    'demo',
    'aboutme',
    'contact',
    'footer',
  ],
  runtimeAssets: [
  ]
};
