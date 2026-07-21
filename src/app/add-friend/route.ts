import { NextResponse, userAgent } from "next/server";

const GA_TRACKING_ID = process.env.GOOGLE_ANALYTICS_ID;
const GA_API_SECRET = process.env.GOOGLE_MEASUREMENT_SECRET;

// UTM data and a ?user_id query param
export async function GET(req: Request) {
  const { searchParams, pathname } = new URL(req.url);
  const gaCookie = req.headers
    .get("cookie")
    ?.split(";")
    .find((c) => c.trim().startsWith("_ga="));

  console.log("GA Cookie:", gaCookie);

  const utmSource = searchParams.get("utm_source") || "share";
  const utmMedium = searchParams.get("utm_medium") || "cbtm";
  const utmCampaign = searchParams.get("utm_campaign") || "friend_share_route";
  const userID = searchParams.get("user_id") || "unknown_user";
  const clientId = crypto.randomUUID(); // Generate a unique client ID for this request

  const { device } = userAgent(req);
  const isiOS =
    device?.type === "mobile" && /iPad|iPhone|iPod/.test(device?.model || "");

  // Log non-iOS device access to GA4
  if (!isiOS) {
    const utm_term = "non_ios_device";
    try {
      const response = await fetch(
        `https://google-analytics.com/mp/collect/?measurement_id=${GA_TRACKING_ID}&api_secret=${GA_API_SECRET}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: "123456789.1234567890", // Use a fixed client ID for non-iOS devices
            validation_behavior: "ENFORCE_RECOMMENDATIONS",
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
      console.log("GA4 logging response status:", response);
    } catch (error) {
      console.error("Failed to log event to GA4:", error);
    }
    return NextResponse.redirect("https://cbtm.app");
  } else {
    console.log(
      "iOS device detected, logging to GA4 and redirecting to app with user ID.",
    );
    const utm_term =
      searchParams.get("user_id") || searchParams.get("utm_term");
    try {
      const response = await fetch(
        `https://google-analytics.com/debug/mp/collect/?measurement_id=${GA_TRACKING_ID}&api_secret=${GA_API_SECRET}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: clientId,
            nonpersonalized_ads: false,
            validation_behavior: "ENFORCE_RECOMMENDATIONS",
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
      console.log("GA4 logging response status:", response);
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
