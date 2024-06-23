import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

const main = async () => {
  const link = process.argv.slice(2);
  if (link.length < 1 || link.length > 1) {
    console.log("Usage: node main.js <link>");
    return;
  }

  console.log("Initiating Crawling...");
  const foundPages = await crawlPage(link);
  printReport(foundPages);
};

main();
