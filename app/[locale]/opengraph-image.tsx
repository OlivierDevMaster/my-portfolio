import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

// The preview shown when a link to the site is shared (LinkedIn, Slack, X…).
// Every page in the locale uses it unless it defines its own.

export const alt = "Olivier Rasolomanana — Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = hasLocale(routing.locales, params.locale)
    ? params.locale
    : routing.defaultLocale;
  const tHero = await getTranslations({ locale, namespace: "home.hero" });
  const tMeta = await getTranslations({ locale, namespace: "common.metadata" });
  const tNav = await getTranslations({ locale, namespace: "common.nav" });

  // The message holds <em>…</em> for the site's violet highlight; the image
  // shows the sentence as plain text.
  const headline = (tHero.raw("title") as string).replace(/<\/?em>/g, "");
  const portrait = await readFile(join(process.cwd(), "public/me.png"));
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#ffffff",
          color: "#0a0a0a",
        }}
      >
        <div
          style={{
            width: 780,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 0 72px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="52" height="52" viewBox="0 0 32 32">
              <path
                d="M23.86 15.44A9 9 0 1 1 16.56 8.14"
                fill="none"
                stroke="#0a0a0a"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <circle cx="21.36" cy="10.64" r="1.2" fill="#7c3aed" fillOpacity="0.55" />
              <circle cx="24.9" cy="7.1" r="2.6" fill="#7c3aed" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 26, fontWeight: 600 }}>
                Olivier Rasolomanana
              </div>
              <div style={{ fontSize: 20, color: "#6b7280" }}>{tNav("role")}</div>
            </div>
          </div>
          <div
            style={{
              fontSize: 58,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {headline}
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.4, color: "#4b5563" }}>
            {tMeta("ogDescription")}
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders a plain <img>. */}
        <img
          src={portraitSrc}
          alt=""
          width={400}
          height={590}
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            objectFit: "contain",
            objectPosition: "top",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 400,
            height: 200,
            display: "flex",
            backgroundImage:
              "linear-gradient(to top, #ffffff, rgba(255,255,255,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 10,
            display: "flex",
            background: "#7c3aed",
          }}
        />
      </div>
    ),
    size
  );
}
