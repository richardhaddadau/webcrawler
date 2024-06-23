import { JSDOM } from "jsdom";
import { URL } from "url";

const normalizeURL = (link) => {
  if (link.length === 0) return "";
  const noProtocol = link.toString().replace(/^https?:\/\//, "");
  return noProtocol.toString().replace(/\/$/, "");
};

const getURLSFromHTML = (html) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const links = document.querySelectorAll("a");
  return Array.from(links).map((link) => link.href);
};

const crawlPage = async (baseURL, currentURL = baseURL, pages = {}) => {
  const parseBaseURL = new URL(baseURL);
  const parseCurrentURL = new URL(currentURL, baseURL);

  if (parseCurrentURL.hostname !== parseBaseURL.hostname) {
    console.log("Error: Base URL and current URL are not on the same host");
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);

  if (normalizedURL in pages) {
    pages[normalizedURL] += 1;
    return pages;
  } else {
    pages[normalizedURL] = 1;
  }

  const toFetch =
    currentURL.slice(0, 1) === "/" ? `${baseURL}${currentURL}` : currentURL;
  const getLinks = await fetchPage(toFetch);

  if (!getLinks) return pages;

  for (const link of getLinks) {
    await crawlPage(baseURL, link, pages);
  }

  return pages;
};

const fetchPage = async (url) => {
  try {
    const webpage = await fetch(url);

    const headerType = webpage.headers.get("content-type").split(";")[0];
    if (headerType !== "text/html") {
      console.log("Error: Not an HTML page");
      return;
    }

    return getURLSFromHTML(await webpage.text());
  } catch (error) {
    if (error.status >= 400) {
      console.log("Error fetching webpage:", error.status);
    }
  }
};

export { normalizeURL, crawlPage };
