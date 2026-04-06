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
    {
      id: "active-teams",
      type: "simple",
      icon: "💻",
      titleKey: "sections.active-teams.title",
      descriptionKey: "sections.active-teams.description",
      url: "https://gist.github.com/cristianorregod/6f71ff128e92e989911332bf92af0bd5",
    },
  ],
};
