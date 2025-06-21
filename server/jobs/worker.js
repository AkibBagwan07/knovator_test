const jobQueue = require("./queue");
const Job = require("../models/Jobs");
const ImportLog = require("../models/ImportLog");

// Worker to process job imports from the queue
jobQueue.process("import-jobs", 5, async (job, done) => {
  const { feedUrl, jobs } = job.data;

  let newJobs = 0;
  let updatedJobs = 0;
  const failedJobs = [];

  for (const jobData of jobs) {
    try {
      const existingJob = await Job.findOne({ url: jobData.url });

      if (existingJob) {
        await Job.updateOne({ _id: existingJob._id }, jobData);
        updatedJobs++;
      } else {
        await Job.create(jobData);
        newJobs++;
      }
    } catch (error) {
      failedJobs.push({
        reason: error.message,
        url: jobData.url || "unknown",
      });
    }
  }

  // Save import summary to logs
  await ImportLog.create({
    url: feedUrl,
    timestamp: new Date(),
    totalFetched: jobs.length,
    totalImported: newJobs + updatedJobs,
    newJobs,
    updatedJobs,
    failedJobs,
  });

  console.log(`✅ Finished processing ${feedUrl}`);
  console.log(`   ➕ New: ${newJobs}, 🔁 Updated: ${updatedJobs}, ❌ Failed: ${failedJobs.length}`);

  done(); // Mark job as complete
});
