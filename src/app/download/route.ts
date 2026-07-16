import { NextResponse } from "next/server";

const GA_TRACKING_ID = process.env.GOOGLE_ANALYTICS_ID;
const GA_API_SECRET = process.env.GOOGLE_MEASUREMENT_SECRET;
const APPSTORE_URL = process.env.NEXT_PUBLIC_APPSTORE_URL;

export async function GET(req: Request) {
  const { searchParams, pathname } = new URL(req.url);

  const utmSource = searchParams.get("utm_source") || "direct";
  const utmMedium = searchParams.get("utm_medium") || "none";
  const utmCampaign = searchParams.get("utm_campaign") || "app_download_route";

  const clientId = crypto.randomUUID(); // Generate a unique client ID for this request

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
                term: searchParams.get("utm_term") || "",
                content: searchParams.get("utm_content") || "",
              },
            },
            {
              name: "page_view",
              params: {
                page_title: "iOS App Store Redirect",
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
  // TODO: redirect to the download page
  if (!APPSTORE_URL) {
    return NextResponse.json(
      { error: "APPSTORE_URL is not defined" },
      { status: 500 },
    );
  }
  return NextResponse.redirect(APPSTORE_URL, 302);
}
