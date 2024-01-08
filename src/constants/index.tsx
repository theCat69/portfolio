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
    description: "Angular was the first node framework I encountered during my carear. I used it on a lot of projects afterward from enterprise level application to small personal project"
  },
  {
    id: 3,
    imgs: [
      ciIcon,
      jenkinsIcon
    ],
    title: "CI/CD Jenkins",
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
  },
  {
    id: 4,
    imgs: [
      sqlIcon,
      dbIcon
    ],
    title: "SQL Databases",
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
  },
  {
    id: 5,
    imgs: [
      testingPyramidIcon
    ],
    title: "Testing",
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
  },
  {
    id: 6,
    imgs: [

    ],
    title: "Formation",
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
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
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
  },
  {
    id: 2,
    preview: {
      link: `${websiteRoot}/notes`,
      img: screenNotes,
    },
    title: "Digital piano",
    repo: `${githubAccountRoot}/vite-native-play-notes`,
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
  },
  {
    id: 3,
    preview: {
      link: `${websiteRoot}/jenkins`,
      img: screenJenkins,
    },
    title: "Jenkins instance",
    description: "Guest Guest Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
  },
  {
    id: 4,
    title: "Mail sender app",
    repo: `${githubAccountRoot}/mail-sender-app`,
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
  },
  {
    id: 5,
    title: "Java argument parser",
    repo: `${githubAccountRoot}/java-parse-args`,
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
  },
  {
    id: 6,
    title: "Blazingly fast Java version manager",
    repo: `${githubAccountRoot}/blazingly-fast-java-version-manager`,
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
  },
]
