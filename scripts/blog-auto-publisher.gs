/**
 * Blog Auto-Publisher for Google Apps Script
 *
 * Setup:
 * 1. Create a new Google Apps Script project
 * 2. Paste this code
 * 3. Set the script properties:
 *    - SITE_API_URL: Your site URL (e.g., https://abkunlimited.com)
 *    - BLOG_PUBLISH_API_KEY: The pre-shared API key
 *    - GOOGLE_SHEETS_ID: The Google Sheets ID with blog data
 * 4. Create a time-driven trigger to run autoPublish() hourly
 */

function autoPublish() {
  var props = PropertiesService.getScriptProperties();
  var siteUrl = props.getProperty("SITE_API_URL");
  var apiKey = props.getProperty("BLOG_PUBLISH_API_KEY");
  var sheetsId = props.getProperty("GOOGLE_SHEETS_ID");

  if (!siteUrl || !apiKey || !sheetsId) {
    Logger.log("Missing script properties. Please configure SITE_API_URL, BLOG_PUBLISH_API_KEY, and GOOGLE_SHEETS_ID.");
    return;
  }

  var sheet = SpreadsheetApp.openById(sheetsId).getSheetByName("blog");
  if (!sheet) {
    Logger.log("Blog sheet not found");
    return;
  }

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var slugCol = headers.indexOf("slug");
  var statusCol = headers.indexOf("status");
  var publishedAtCol = headers.indexOf("published_at");

  if (slugCol === -1 || statusCol === -1 || publishedAtCol === -1) {
    Logger.log("Required columns not found: slug, status, published_at");
    return;
  }

  var now = new Date();
  var published = 0;

  for (var i = 1; i < data.length; i++) {
    var status = data[i][statusCol];
    var publishAt = data[i][publishedAtCol];
    var slug = data[i][slugCol];

    if (status !== "scheduled" || !slug) continue;

    var publishDate = new Date(publishAt);
    if (isNaN(publishDate.getTime()) || publishDate > now) continue;

    // Call the publish API
    try {
      var response = UrlFetchApp.fetch(siteUrl + "/api/blog/publish", {
        method: "POST",
        contentType: "application/json",
        headers: {
          "X-API-Key": apiKey,
        },
        payload: JSON.stringify({ slug: slug }),
        muteHttpExceptions: true,
      });

      var result = JSON.parse(response.getContentText());
      if (result.success) {
        published++;
        Logger.log("Published: " + slug);
      } else {
        Logger.log("Failed to publish " + slug + ": " + (result.error || "Unknown error"));
      }
    } catch (e) {
      Logger.log("Error publishing " + slug + ": " + e.message);
    }
  }

  Logger.log("Auto-publish complete. Published " + published + " post(s).");
}

/**
 * Manual trigger to set up the hourly timer.
 * Run this once to create the time-driven trigger.
 */
function setupTrigger() {
  // Remove existing triggers
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "autoPublish") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Create hourly trigger
  ScriptApp.newTrigger("autoPublish")
    .timeBased()
    .everyHours(1)
    .create();

  Logger.log("Hourly auto-publish trigger created.");
}
