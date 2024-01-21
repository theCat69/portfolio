import type { SpeakConfig } from 'qwik-speak';
import { frFlag, ukFlag, usFlag } from './media';

export const supportedLocals = [
  { lang: 'en-US', langIso2: 'en', currency: 'USD', timeZone: 'America/Chicago', flag: usFlag },
  { lang: 'fr-FR', langIso2: 'fr', currency: 'EUR', timeZone: 'Europe/Rome', flag: frFlag },
  { lang: 'en-EN', langIso2: 'en', currency: 'EUR', timeZone: 'Europe/Rome', flag: ukFlag }
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
