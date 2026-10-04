import { createFileRoute } from "@tanstack/react-router";

const packageName = "com.codetech.ramanujansquare";

export const Route = createFileRoute("/.well-known/assetlinks.json")({
  server: {
    handlers: {
      GET: async () => {
        const fingerprint = process.env["ANDROID_SHA256_CERT_FINGERPRINT"]?.trim();
        const statements = fingerprint
          ? [
              {
                relation: ["delegate_permission/common.handle_all_urls"],
                target: {
                  namespace: "android_app",
                  package_name: packageName,
                  sha256_cert_fingerprints: [fingerprint],
                },
              },
            ]
          : [];

        return new Response(JSON.stringify(statements), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=300",
          },
        });
      },
    },
  },
});