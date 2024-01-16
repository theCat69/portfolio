import { inlineTranslate } from "qwik-speak"
import { angularIcon, ciIcon, dbIcon, javaIcon, jenkinsIcon, springBootIcon, sqlIcon, testingPyramidIcon, typeScriptIcon } from "~/media"

export interface Skill {
  id: number,
  imgs: string[],
  title: string,
  description: string
}

// Wierdly i had to put this inside a method or speak wont 
// interpolate the values
// But this was working fine in app.ts
export const skills = (): Skill[] => {
  const t = inlineTranslate();

  return [
    {
      id: 1,
      imgs: [
        javaIcon,
        springBootIcon
      ],
      title: t('skill.card.java.title@@Java'),
      description: t('skill.card.java.desc@@Java is my main focus for more than 5 years. I had the chance to work on Java versions 6, 8, 11 and 17. I mastered technologies like Spring, Spring Boot, Maven, Hibernate and JUnit.')
    },
    {
      id: 2,
      imgs: [
        typeScriptIcon,
        angularIcon
      ],
      title: t('skill.card.angular.title@@Angular'),
      description: t('skill.card.angular.desc@@Angular was the first node framework I encountered during my carear. I used it on a lot of projects afterward from enterprise level application to small personal project.')
    },
    {
      id: 3,
      imgs: [
        ciIcon,
        jenkinsIcon
      ],
      title: t('skill.card.jenkins.title@@CI/CD Jenkins'),
      description: t('skill.card.jenkins.desc@@Jenkins was the main tool I used for CI pipelines. From generic pipeline using libraries to project specific CI task, I experienced a wide range of feature from Jenkins.')
    },
    {
      id: 4,
      imgs: [
        sqlIcon,
        dbIcon
      ],
      title: t('app.sqldb'),
      description: t('skill.card.sqldb.desc@@All the projects i worked on were using SQL Databases. I had the chance to work with Oracle database, DB2 as400, Postgres and MariaDB. I wrote a large range of SQL scripts from simple select to complicated transactional procedures.')
    },
    {
      id: 5,
      imgs: [
        testingPyramidIcon
      ],
      title: t('skill.card.testing.title@@Testing'),
      description: t('skill.card.testing.desc@@I always had a special care for testing. Testing is a complicated topic that should be thinked and rethinked during the whole lifetime of a project. Unit tests, Integration tests and end to end testing all have there advantages and inconvinient.')
    },
    {
      id: 6,
      imgs: [

      ],
      title: t('skill.card.formation.title@@Formation'),
      description: t('skill.card.formation.desc@@I love teaching and sharing knowledge with others. In my most recents work experience I often took the role of a technical reference for my coworker. That helped me to gain skills in teaching others, writing exercise or presentations.')
    },
  ]
}; 
