import { angularIcon, ciIcon, dbIcon, javaIcon, jenkinsIcon, springBootIcon, sqlIcon, testingPyramidIcon, typeScriptIcon } from "~/media"

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
