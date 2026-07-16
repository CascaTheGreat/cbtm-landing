import { NextResponse } from "next/server";

const GA_TRACKING_ID = process.env.GOOGLE_ANALYTICS_ID;
const GA_API_SECRET = process.env.GOOGLE_MEASUREMENT_SECRET;
const APPSTORE_URL = process.env.NEXT_PUBLIC_APPSTORE_URL;

// UTM data and a ?user_id query param
export async function GET(req: Request) {
  const { searchParams, pathname } = new URL(req.url);

  const utmSource = searchParams.get("utm_source") || "share";
  const utmMedium = searchParams.get("utm_medium") || "social";
  const utmCampaign = searchParams.get("utm_campaign") || "friend_share_route";
  const userID = searchParams.get("user_id") || "unknown_user";
  const clientId = crypto.randomUUID(); // Generate a unique client ID for this request

  console.log("utmData", utmSource, utmMedium, utmCampaign, userID);

  const isiOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // Log non-iOS device access to GA4
  if (!isiOS) {
    const utm_term = "non_ios_device";
    try {
      fetch(
        `https://google-analytics.com/mp/collect/?measurement_id=${GA_TRACKING_ID}&api_secret=${GA_API_SECRET}`,
        {
          method: "POST",
          body: JSON.stringify({
            client_id: clientId,
            events: [
              {
                name: "campaign_details",
                params: {
                  campaign_id: searchParams.get("utm_id") || "",
                  campaign: utmCampaign,
                  source: utmSource,
                  medium: utmMedium,
                  term: utm_term,
                  content: searchParams.get("utm_content") || "",
                },
              },
              {
                name: "page_view",
                params: {
                  page_title: "Add friend (non-iOS device)",
                  page_location: req.url, // Full inbound tracking link
                  page_path: pathname, // e.g., "/api/download"
                },
              },
            ],
          }),
        },
      );
    } catch (error) {
      console.error("Failed to log event to GA4:", error);
    }
    return NextResponse.redirect("https://cbtm.app");
  } else {
    try {
      fetch(
        `https://google-analytics.com/mp/collect/?measurement_id=${GA_TRACKING_ID}&api_secret=${GA_API_SECRET}`,
        {
          method: "POST",
          body: JSON.stringify({
            client_id: clientId,
            events: [
              {
                name: "campaign_details",
                params: {
                  campaign_id: searchParams.get("utm_id") || "",
                  campaign: utmCampaign,
                  source: utmSource,
                  medium: utmMedium,
                  term:
                    searchParams.get("user_id") ||
                    searchParams.get("utm_term") ||
                    "",
                  content: searchParams.get("utm_content") || "",
                },
              },
              {
                name: "page_view",
                params: {
                  page_title: "Add friend (non-iOS device)",
                  page_location: req.url, // Full inbound tracking link
                  page_path: pathname, // e.g., "/api/download"
                },
              },
            ],
          }),
        },
      );
    } catch (error) {
      console.error("Failed to log event to GA4:", error);
    }

    if (!userID) {
      return NextResponse.redirect("https://cbtm.app");
    } else {
      return NextResponse.redirect(`cbtm://friends/${userID}`);
    }
  }
}
