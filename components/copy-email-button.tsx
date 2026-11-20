"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";

/** Copies CONTACT_EMAIL; falls back to opening the mail app. Styled for dark backgrounds. */
export default function CopyEmailButton() {
  const t = useTranslations("contact.copyEmail");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-600 px-6 text-[15px] font-medium text-white transition hover:bg-white/10 focus-visible:ring-offset-neutral-950"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4 text-emerald-400" />
      ) : (
        <Copy aria-hidden="true" className="size-4" />
      )}
      <span aria-live="polite">{copied ? t("copied") : t("copy")}</span>
    </button>
  );
}
