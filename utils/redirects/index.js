import internalRedirects from "./internalRedirects";
import contentfulRedirects from "./contentfulRedirects";

export default async function getRedirects() {
  const internal = internalRedirects;
  const contentful = await contentfulRedirects();

  return [internal, contentful].flat();
}
