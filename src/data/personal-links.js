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
  sections: [
    {
      id: "services",
      type: "simple",
      icon: "🚀",
      titleKey: "sections.services.title",
      descriptionKey: "sections.services.description",
      url: "https://cristianorrego.dev/services",
    },
    {
      id: "projects",
      type: "simple",
      icon: "🛠️",
      titleKey: "sections.projects.title",
      descriptionKey: "sections.projects.description",
      url: "https://cristianorrego.dev/projects",
    },
    {
      id: "learning-sql",
      type: "accordion",
      icon: "📊",
      titleKey: "sections.learning-sql.title",
      descriptionKey: "sections.learning-sql.description",
      items: [
        {
          id: "contact-email",
          labelKey: "sections.learning-sql.items.sql-bolt",
          url: "https://sqlbolt.com/",
        },
        {
          id: "contact-linkedin",
          labelKey: "sections.learning-sql.items.sql-side-quest",
          url: "https://www.sqlsidequest.com/",
        },
        {
          id: "contact-schedule",
          labelKey: "sections.learning-sql.items.aprende-sql",
          url: "https://aprendesql.dev/",
        },
      ],
    },
  ],
};
