<template>
  <router-view />
</template>

<script setup>
import { useMeta } from "quasar";
defineOptions({
  name: "App",
});
const metaData = {
  // sets document title
  title: "Product Authentication Quick Scan",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `Home | ${title} `,

  // meta tags
  meta: {
    description: {
      name: "description",
      content:
        "Product Authentication Quick Scan (PAQS) is a robust system designed with product management and consumer protection in mind. PAQS helps product manufacturers protect their brands as well as ensuring that consumers are getting their wares from the right source.",
    },
    keywords: {
      name: "keywords",
      content: [
        "Product Authentication",
        "Brand Protection",
        "Authentication",
        "Sales Management",
        "Dashboard",
        "QR code Generation",
        "QR Code Scan",
        "Unique identity",
        "Batch QR code",
        "Product tracking",
        "Product tracing",
      ],
    },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle} - Product Authentication Quick Scan`;
      },
    },
  },

  // CSS tags
  link: {
    material: {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons",
    },
  },

  // JS tags
  script: {
    ldJson: {
      type: "application/ld+json",
      innerHTML: `{ "@context": "http://schema.org" }`,
    },
  },

  // <html> attributes
  htmlAttr: {
    "xmlns:cc": "http://creativecommons.org/ns#", // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined, // generates <html empty>
  },

  // <body> attributes
  bodyAttr: {
    "action-scope": "xyz", // generates <body action-scope="xyz">
    empty: undefined, // generates <body empty>
  },

  // <noscript> tags
  noscript: {
    default: "This is content for browsers with no JS (or disabled JS)",
  },
};

useMeta(metaData);
</script>
