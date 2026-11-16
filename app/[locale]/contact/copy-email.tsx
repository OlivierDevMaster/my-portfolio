"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy, Mail } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";

export default function CopyEmail() {
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
    <div className="mt-10 flex items-center gap-2 rounded-2xl border border-gray-200 p-2 pl-4">
      <Mail aria-hidden="true" className="size-4 shrink-0 text-violet-600" />
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="min-w-0 flex-1 truncate py-2 text-sm font-medium sm:text-base"
      >
        {CONTACT_EMAIL}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-gray-100 px-4 text-sm font-medium text-neutral-950 transition hover:bg-gray-200"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-4 text-emerald-600" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
        <span aria-live="polite">{copied ? t("copied") : t("copy")}</span>
      </button>
    </div>
  );
}
