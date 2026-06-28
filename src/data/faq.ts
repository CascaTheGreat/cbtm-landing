import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
  {
    question: `Is ${siteDetails.siteName} secure?`,
    answer:
      "Absolutely. All location information is calculated on your device, so our servers only send out anonymous, aggregated data. When you share your location with friends, only the building you are in is shared, not your exact location. We also use end-to-end encryption for all data transfers, ensuring your information remains private and secure.",
  },
  {
    question: `Can I use ${siteDetails.siteName} on multiple devices?`,
    answer:
      "Only one device can be connected to your account at a time. If you log in on a new device, the previous device will be automatically logged out. Support for wearables is coming soon, allowing you to stay connected away from your phone.",
  },
  {
    question: `Is ${siteDetails.siteName} available on Android?`,
    answer: `${siteDetails.siteName} is only available on iOS at the moment, but we are actively working on an Android version. Stay tuned for updates!`,
  },
  {
    question: `How does ${siteDetails.siteName} make money if the app is free?`,
    answer:
      "We offer subscriptions for premium features, which help us maintain and improve the app. Additionally, we may partner with select businesses to provide location-based services, like promoting restaurants in the explore section.",
  },
  {
    question: `How does ${siteDetails.siteName} provide accurate location information?`,
    answer:
      "CBTM uses a proprietary combination of GPS, Wi-Fi, and cellular data to provide accurate location information. We analyze this data to match your location to campus buildings with a high degree of accuracy.",
  },
];
