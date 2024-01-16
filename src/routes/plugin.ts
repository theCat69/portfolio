import type { RequestHandler } from '@builder.io/qwik-city';
import { config, supportedLocals } from '../speak-config';
import { validateLocale } from 'qwik-speak';

export const onRequest: RequestHandler = ({ request, params, locale, error }) => {
  let lang: string | undefined = undefined;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const acceptLanguage = request.headers?.get('accept-language');

  if (params.lang && validateLocale(params.lang)) {
    // Check supported locales
    lang = config.supportedLocales.find(value => value.lang === params.lang)?.lang;
    // 404 error page
    if (!lang) throw error(404, 'Page not found');
  } else if (acceptLanguage) {
    // this works locally only and dont even make sense now that we redirect to the correct lang from base index.html
    // however this would work if we don't use SSG so i leave it like this
    const acceptLangageArray = acceptLanguage.split(';').join(',').split(',');
    lang = findLanguageSupported(acceptLangageArray);
    if (!lang) lang = config.defaultLocale.lang;
  } else {
    lang = config.defaultLocale.lang;
  }

  // Set Qwik locale
  locale(lang);
};

export const findLanguageSupported = (acceptLanguageArray: string[] | readonly string[]): string | undefined => {
  // first we look if we can resolve the first locale with format langage-region 2chars-2chars 
  for (let i = 0; i < acceptLanguageArray.length; i++) {
    if (supportedLocals.find(locale => locale.lang === acceptLanguageArray[i])) return acceptLanguageArray[i];
  }

  // then we fallback to the first locale supported with format language 2chars regardless or region
  for (let i = 0; i < acceptLanguageArray.length; i++) {
    const localeFound = supportedLocals.find(locale => locale.langIso2 === acceptLanguageArray[i]);
    if (localeFound) return localeFound.lang;
  }

  return;
}

