import type { RequestHandler } from '@builder.io/qwik-city';
import { config, supportedLocals } from '../speak-config';
import { validateLocale } from 'qwik-speak';

export const onRequest: RequestHandler = ({ request, params, cookie, locale, error }) => {
  let lang: string | undefined = undefined;
  const langCookie = cookie.get('lang')?.value;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const acceptLanguage = request.headers?.get('accept-language');

  // this is used during build and when dev using npm run dev to find the correct lang to apply
  if (params.lang && validateLocale(params.lang)) {
    // Check supported locales
    console.log('params');
    lang = config.supportedLocales.find(value => value.lang === params.lang)?.lang;
    // 404 error page
    if (!lang) throw error(404, 'Page not found');
  } else if (langCookie) {
    lang = langCookie;
  } else if (acceptLanguage) {
    const acceptLangageArray = acceptLanguage.split(';').join(',').split(',');
    lang = findLanguageSupported(acceptLangageArray);
    if (!lang) lang = config.defaultLocale.lang;
  } else {
    console.log('default');
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

