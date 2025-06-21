const axios = require("axios");
const xml2js = require("xml2js");
const jobQueue = require("../jobs/queue");

const feedUrls = [
  "https://jobicy.com/?feed=job_feed",
  "https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time",
  "https://jobicy.com/?feed=job_feed&job_categories=copywriting",
];

async function fetchJobsFromFeed(feedUrl) {
  try {
    const { data: xml } = await axios.get(feedUrl);
    const json = await xml2js.parseStringPromise(xml, { explicitArray: false });
    const jobs = json.rss.channel.item || [];

    const normalized = jobs.map((job) => ({
      title: job.title,
      company: job["job:company"] || "Unknown",
      location: job["job:location"] || "Remote",
      url: job.link,
      description: job.description,
      datePosted: new Date(job.pubDate),
    }));

    await jobQueue.add("import-jobs", {
      feedUrl,
      jobs: normalized,
    });

    console.log(`✅ Enqueued ${normalized.length} jobs from ${feedUrl}`);
  } catch (err) {
    console.error(`❌ Failed to fetch feed: ${feedUrl}`, err.message);
  }
}

async function fetchAllFeeds() {
  for (const url of feedUrls) {
    await fetchJobsFromFeed(url);
  }
}

module.exports = fetchAllFeeds;
