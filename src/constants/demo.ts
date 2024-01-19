import { inlineTranslate } from "qwik-speak"
import { screenJenkins, screenNotes, screenPortfolio } from "~/media"

export interface DemoProject {
  id: number,
  title: string,
  preview?: DemoProjectPreview,
  repo?: string,
  description: string
}

export interface DemoProjectPreview {
  link: string,
  img: string,
}

const websiteRoot = "https://thecatmaincave.com";
const githubAccountRoot = "https://github.com/theCat69";

// Wierdly i had to put this inside a method or speak wont 
// interpolate the values
// But this was working fine in app.ts
export const demoProjects = (): DemoProject[] => {
  const t = inlineTranslate();

  return [
    {
      id: 1,
      preview: {
        link: websiteRoot,
        img: screenPortfolio,
      },
      title: t('demo.card.portfolio.title@@Portfolio'),
      repo: `${githubAccountRoot}/portfolio`,
      description: t('demo.card.portfolio.desc@@This is a reference to this website. Made with Qwik(the brand new framework from the Angular team) and Tailwind.')
    },
    {
      id: 2,
      preview: {
        link: `${websiteRoot}/notes`,
        img: screenNotes,
      },
      title: t('demo.card.digitalpiano.title@@Digital piano'),
      repo: `${githubAccountRoot}/vite-native-play-notes`,
      description: t('demo.card.digitalpiano.desc@@A simple digital piano. You can interact with it using your keyboard or a touchable screen. This project was made over a rainy week-end using Vite and TS.')
    },
    {
      id: 3,
      preview: {
        link: `${websiteRoot}/jenkins`,
        img: screenJenkins,
      },
      title: t('demo.card.jenkins.title@@Jenkins instance'),
      description: t('demo.card.jenkins.desc@@Linked to my own Jenkins instance. You can browse inside and check the different projects using the Guest accounrt (Guest/Guest).')
    },
    {
      id: 4,
      title: t('demo.card.mailsenderapp.title@@Mail sender app'),
      repo: `${githubAccountRoot}/mail-sender-app`,
      description: t('demo.card.mailsenderapp.desc@@A simple SpringBoot Java project I made to send emails (it is used by this website in the contact section). I used this projects as an example projects to show how to use DDD and correct testing configuration in a spring boot project.')
    },
    {
      id: 5,
      title: t('demo.card.javaargparser.title@@Java argument parser'),
      repo: `${githubAccountRoot}/java-parse-args`,
      description: t('demo.card.javaargparser.desc@@This is a solution to an excercise made in few hours. The subject was "Make an easy to use CLI argument parser to be used as a library". This is my take on it."')
    },
    {
      id: 6,
      title: t('demo.card.bfjvm.title@@BF-J-VM'),
      repo: `${githubAccountRoot}/blazingly-fast-java-version-manager`,
      description: t('demo.card.bfjvm.desc@@I wanted to learn Rust, I am a Windows user, I love CLI tools but I dislike GitBash a lot (it is terribly slow). I wanted something similar to sdkman but compatible with windows and with good performance. Thus I made this project.')
    },
  ]
};
