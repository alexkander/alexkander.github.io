// Single source of truth for the profile shown on the site.

export const profile = {
  name: 'Alexander Rondón',
  title: 'Software Engineer',
  tagline: 'Software engineer building scalable backend systems, with a soft spot for home labs, AI, and hardware.',
  /** Introduction of the home page, one string per paragraph. */
  intro: [
    "Hi everyone, I'm a developer. I like taking an idea from start to finish: turning it into code that works and learning along the way.",
    'I spend a huge amount of time working with AI coding agents, which in turn have given me the time and support to organize many ideas I had pending.',
    "Here I'll publish apps, demos, proofs of concept, and experiments from my ongoing learning about software, AI, home labs, and self-hosting, along with other things I want to keep a record of. Many of them will be improved or made directly with agents: I decide what to do, and I review and test the result. Publishing them is my way of giving each idea a proper ending, getting it out of my head, and making room for new ones. I hope they help someone else.",
  ],
  /** Closing sections of the home page. */
  about: {
    title: 'A bit more about me',
    text: "I decided to study computing when the first computer arrived at home, and before starting university I was already building systems for my school. I've been working as a developer for more than 15 years: first at other people's companies and then, for many years, at a couple that friends from university invited me to start with them, where we worked in small, self-managed teams. For the last 4 years I've been working at",
    employer: { name: 'intive', url: 'https://www.intive.com/' },
    textEnd: 'with a great team.',
  },
  offWork: {
    title: "When I'm not coding",
    text: "I'm usually in the middle of some DIY project: hardware, CAD parts to 3D print, or things made of wood. Yes, you can buy almost all of it ready-made, but I like to overcomplicate things, just for fun. I also enjoy film, photography (including the night sky), and learning to play instruments. And yes, that's too many hobbies.",
  },
  email: 'me@alexkander.dev',
  links: {
    github: 'https://github.com/alexkander',
    linkedin: 'https://www.linkedin.com/in/arondn2/',
  },
};
