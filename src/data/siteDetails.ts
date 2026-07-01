export const siteDetails = {
  siteName: "CBTM",
  siteUrl: "https://cbtm.vercel.app/",
  metadata: {
    title: "CBTM - Your Ultimate Campus Companion",
    description:
      "CBTM is your ultimate campus companion, providing live insights into campus locations, chat with friends, and finding the best spots to hang out.",
  },
  language: "en-us",
  locale: "en-US",
  siteLogo: `${process.env.BASE_PATH || ""}/images/logo.png`, // or use a string for the logo e.g. "TechStartup"
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID, // e.g. G-XXXXXXX,
};
