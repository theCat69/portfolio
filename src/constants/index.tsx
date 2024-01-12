import { angularIcon, ciIcon, dbIcon, javaIcon, jenkinsIcon, screenJenkins, screenNotes, screenPortfolio, springBootIcon, sqlIcon, testingPyramidIcon, typeScriptIcon } from "~/media"

export interface NavLink {
  id: number,
  href: string,
  label: string
}

export const navLinks: NavLink[] = [
  { id: 1, href: "#home", label: "Home" },
  { id: 2, href: "#my-skills", label: "My skills" },
  { id: 3, href: "#demo-projects", label: "Demo projects" },
  { id: 4, href: "#about-me", label: "About me" },
  { id: 5, href: "#contact-me", label: "Contact me" }
]

export interface Skill {
  id: number,
  imgs: string[],
  title: string,
  description: string
}

export const skills: Skill[] = [
  {
    id: 1,
    imgs: [
      javaIcon,
      springBootIcon
    ],
    title: "Java",
    description: "Java is my main focus for more than 5 years. I had the chance to work on Java versions 6, 8, 11 and 17. I mastered technologies like Spring, Spring Boot, Maven, Hibernate and JUnit."
  },
  {
    id: 2,
    imgs: [
      typeScriptIcon,
      angularIcon
    ],
    title: "Angular",
    description: "Angular was the first node framework I encountered during my carear. I used it on a lot of projects afterward from enterprise level application to small personal project."
  },
  {
    id: 3,
    imgs: [
      ciIcon,
      jenkinsIcon
    ],
    title: "CI/CD Jenkins",
    description: "Jenkins was the main tool I used for CI pipelines. From generic pipeline using libraries to project specific CI task, I experienced a wide range of feature from Jenkins."
  },
  {
    id: 4,
    imgs: [
      sqlIcon,
      dbIcon
    ],
    title: "SQL Databases",
    description: "All the projects i worked on were using SQL Databases. I had the chance to work with Oracle database, DB2 as400, Postgres and MariaDB. I wrote a large range of SQL scripts from simple select to complicated transactional procedures."
  },
  {
    id: 5,
    imgs: [
      testingPyramidIcon
    ],
    title: "Testing",
    description: "I always had a special care for testing. Testing is a complicated topic that should be thinked and rethinked during the whole lifetime of a project. Unit tests, Integration tests and end to end testing all have there advantages and inconvinient."
  },
  {
    id: 6,
    imgs: [

    ],
    title: "Formation",
    description: "I love teaching and sharing knowledge with others. In my most recents work experience I often took the role of a technical reference for my coworker. That helped me to gain skills in teaching others, writing exercise or presentations."
  },
]

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

export const demoProjects: DemoProject[] = [
  {
    id: 1,
    preview: {
      link: websiteRoot,
      img: screenPortfolio,
    },
    title: "Portfolio",
    repo: `${githubAccountRoot}/portfolio`,
    description: "This is a reference to this website. Made with Qwik(the brand new framework from the Angular team) and Tailwind."
  },
  {
    id: 2,
    preview: {
      link: `${websiteRoot}/notes`,
      img: screenNotes,
    },
    title: "Digital piano",
    repo: `${githubAccountRoot}/vite-native-play-notes`,
    description: "A simple digital piano. You can interact with it using your keyboard or a touchable screen. This project was made over a rainy week-end using Vite and TS."
  },
  {
    id: 3,
    preview: {
      link: `${websiteRoot}/jenkins`,
      img: screenJenkins,
    },
    title: "Jenkins instance",
    description: "Linked to my own Jenkins instance. You can browse inside and check the different projects using the Guest accounrt (Guest/Guest)."
  },
  {
    id: 4,
    title: "Mail sender app",
    repo: `${githubAccountRoot}/mail-sender-app`,
    description: "A simple SpringBoot Java project I made to send emails (it is used by this website in the contact section). I used this projects as an example projects to show how to use DDD and correct testing configuration in a spring boot project."
  },
  {
    id: 5,
    title: "Java argument parser",
    repo: `${githubAccountRoot}/java-parse-args`,
    description: "This is a solution to an excercise made in few hours. The subject was \"Make an easy to use CLI argument parser to be used as a library\". This is my take on it."
  },
  {
    id: 6,
    title: "BF-J-VM",
    repo: `${githubAccountRoot}/blazingly-fast-java-version-manager`,
    description: "I wanted to learn Rust, I am a Windows user, I love CLI tools but I dislike GitBash a lot (it is terribly slow). I wanted something similar to sdkman but compatible with windows and with good performance. Thus I made this project."
  },
]
