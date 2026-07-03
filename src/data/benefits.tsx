import {
  FiBarChart2,
  FiBriefcase,
  FiDollarSign,
  FiLock,
  FiPieChart,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";

import { IBenefit } from "@/types";

export const benefits: IBenefit[] = [
  {
    title: "Always Locked",
    description:
      "Take the guesswork out of a night out. With CBTM, you can always know how busy a bar is before you go, so you can plan your night with confidence.",
    bullets: [
      {
        title: "Intelligent Localization",
        description:
          "Our proprietary location matching algorithm gets you excellent information, every time.",
        icon: <FiBarChart2 size={26} />,
      },
      {
        title: "In The Know",
        description:
          "Our real-time data ensures you always know the best spots to be, and the ones to avoid.",
        icon: <FiTarget size={26} />,
      },
      {
        title: "Predictive Insights",
        description:
          "Get ahead of the crowd with our predictive analytics, helping you plan your night out like a pro.",
        icon: <FiTrendingUp size={26} />,
      },
    ],
    imageSrc: "/images/mockup-1.webp",
  },
  {
    title: "Read the Room",
    description:
      "Access crowd-source insights on the vibes and atmosphere of your favorite spots.",
    bullets: [
      {
        title: "Pricing FR",
        description:
          "Get a college-student friendly breakdown of the cost of drinks and cover charges.",
        icon: <FiDollarSign size={26} />,
      },
      {
        title: "Vibe Check",
        description:
          "Get real-time, crowd-source vibe checks on your favorite hangs.",
        icon: <FiBriefcase size={26} />,
      },
      {
        title: "Chop it Up",
        description:
          "Join dedicated feeds to yap about the situation while you're there.",
        icon: <FiPieChart size={26} />,
      },
    ],
    imageSrc: "/images/mockup-2.webp",
  },
  {
    title: "Fed-Tier Security",
    description:
      "Your location is important. We spare no expense in keeping your information safe and secure.",
    bullets: [
      {
        title: "Military-Grade Encryption",
        description:
          "We encrypt your data from the moment it leaves your device with AES-256, the same standard used by the U.S. government.*",
        icon: <FiLock size={26} />,
      },
      {
        title: "You Control Access",
        description:
          "You have complete control over which users can see your access and when. Users will never see more than you allow, and then never more than the building you're in.",
        icon: <FiUser size={26} />,
      },
      {
        title: "Never Sold or Shared",
        description:
          "At CBTM, we're freaks about personal privacy. We don't sell identifying information about you to anyone without your express consent. We partner with Google to serve ads that may be personalized if you choose to opt-in - that's it.",
        icon: <FiShield size={26} />,
      },
    ],
    imageSrc: "/images/mockup-3.webp",
  },
];
