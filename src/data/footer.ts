import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
  subheading: string;
  quickLinks: IMenuItem[];
  email: string;
  telephone: string;
  socials: ISocials;
} = {
  subheading: "Redefining the college social experience.",
  quickLinks: [
    {
      text: "Features",
      url: "#features",
    },
    {
      text: "FAQ",
      url: "#faq",
    },
    {
      text: "Privacy Policy",
      url: "/privacy",
    },
    {
      text: "Terms of Service",
      url: "/terms-of-service",
    },
    { text: "Share Your CBTMoment", url: "/share-your-cbtmoment" },
    {
      text: "Submit Your Event",
      url: "/submit-event",
    },
  ],
  email: "help@cbtm.app",
  telephone: "+1 (123) 456-7890",
  socials: {
    // github: 'https://github.com',
    // x: 'https://twitter.com/x',
    // twitter: "https://twitter.com/Twitter",
    // facebook: "https://facebook.com",
    // youtube: 'https://youtube.com',
    // linkedin: "https://www.linkedin.com",
    // threads: 'https://www.threads.net',
    instagram: "https://www.instagram.com",
    tiktok: "https://www.tiktok.com",
  },
};
