export const PERSONAL_LINKS_DATA = {
  profile: {
    name: "Cristian Orrego",
    avatar: "/images/me.JPG",
    bioKey: "profile.bio",
    social: [
      {
        id: "linkedin",
        labelKey: "social.linkedin",
        url: "https://www.linkedin.com/in/cristianorregod/",
      },
      {
        id: "github",
        labelKey: "social.github",
        url: "https://github.com/cristianorregod",
      },
      {
        id: "email",
        labelKey: "social.email",
        url: "mailto:cristian.duquew@gmail.com",
      },
    ],
  },
  // `url` starting with "/" is an internal, locale-aware route.
  // `icon` maps to an SVG icon in PersonalLinksLanding; `tone` picks the accent.
  sections: [
    {
      id: "services",
      type: "simple",
      icon: "briefcase",
      tone: "primary",
      titleKey: "sections.services.title",
      descriptionKey: "sections.services.description",
      url: "/services",
    },
    {
      id: "projects",
      type: "simple",
      icon: "code",
      tone: "primary",
      titleKey: "sections.projects.title",
      descriptionKey: "sections.projects.description",
      url: "/projects",
    },
    {
      id: "learning-sql",
      type: "accordion",
      icon: "database",
      tone: "secondary",
      titleKey: "sections.learning-sql.title",
      descriptionKey: "sections.learning-sql.description",
      items: [
        {
          id: "sql-bolt",
          labelKey: "sections.learning-sql.items.sql-bolt",
          url: "https://sqlbolt.com/",
        },
        {
          id: "sql-side-quest",
          labelKey: "sections.learning-sql.items.sql-side-quest",
          url: "https://www.sqlsidequest.com/",
        },
        {
          id: "aprende-sql",
          labelKey: "sections.learning-sql.items.aprende-sql",
          url: "https://aprendesql.dev/",
        },
      ],
    },
  ],
};
