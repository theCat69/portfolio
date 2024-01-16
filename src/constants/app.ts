import { inlineTranslate } from "qwik-speak"

export interface NavLink {
  id: number,
  href: string,
  label: string
}

export const navLinks = (): NavLink[] => {
  const t = inlineTranslate();

  return [
    { id: 1, href: "#home", label: t('app.home@@Home') },
    { id: 2, href: "#my-skills", label: t('app.myskills@@My skills') },
    { id: 3, href: "#demo-projects", label: t('app.demo@@Demo projects') },
    { id: 4, href: "#about-me", label: t('app.aboutme@@About me') },
    { id: 5, href: "#contact-me", label: t('app.contactme@@Contact me') }
  ]
}; 
