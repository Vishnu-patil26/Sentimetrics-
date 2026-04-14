/**
 * GSMArena Upcoming Phones Scraper
 *
 * Targets https://www.gsmarena.com/rumored.php using puppeteer-extra with the
 * stealth plugin to mitigate Cloudflare bot detection. On failure or insufficient
 * results, returns a curated fallback dataset so the real-time feed never breaks.
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

// ---------------------------------------------------------------------------
// Fallback dataset — reflects plausible upcoming flagship devices
// ---------------------------------------------------------------------------
const FALLBACK_PHONES = [
  {
    name: 'Samsung Galaxy S26 Ultra',
    status: 'Expected Q1 2026',
    expectedPrice: 'Approx. Rs. 1,39,999',
  },
  {
    name: 'Apple iPhone 17 Pro Max',
    status: 'Expected September 2025',
    expectedPrice: 'Approx. Rs. 1,34,900',
  },
  {
    name: 'Google Pixel 10 Pro',
    status: 'Expected Q3 2025',
    expectedPrice: 'Approx. Rs. 1,09,999',
  },
  {
    name: 'OnePlus 14',
    status: 'Expected Q1 2026',
    expectedPrice: 'Approx. Rs. 74,999',
  },
  {
    name: 'Xiaomi 15 Ultra',
    status: 'Expected Q2 2025',
    expectedPrice: 'Approx. Rs. 1,04,999',
  },
  {
    name: 'Nothing Phone 3',
    status: 'Expected mid-2025',
    expectedPrice: 'Approx. Rs. 44,999',
  },
  {
    name: 'ASUS ROG Phone 9 Pro',
    status: 'Expected Q3 2025',
    expectedPrice: 'Approx. Rs. 99,999',
  },
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Scrapes GSMArena rumored phones page for upcoming device listings.
 * Returns an array of phone objects: { name, status, expectedPrice }.
 * Falls back to FALLBACK_PHONES if scraping fails or yields < 3 results.
 *
 * @returns {Promise<Array<{ name: string, status: string, expectedPrice: string }>>}
 */
async function scrapeUpcomingPhones() {
  let browser = null;

  try {
    console.log('[scraper] Launching stealth browser instance...');

    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--window-size=1280,900',
      ],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    );
    await page.setViewport({ width: 1280, height: 900 });
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

    console.log('[scraper] Navigating to GSMArena rumored phones page...');

    await page.goto('https://www.gsmarena.com/rumored.php', {
      waitUntil: 'networkidle2',
      timeout: 45000,
    });

    // Allow the page to fully settle before parsing
    await delay(2500 + Math.random() * 1500);

    const phones = await page.evaluate(() => {
      const results = [];

      // GSMArena device lists use .makers ul li > a > img + span structure
      const items = document.querySelectorAll('.makers li');

      items.forEach((item, index) => {
        if (index >= 8) return;

        const nameEl = item.querySelector('span');
        if (nameEl) {
          const rawName = nameEl.textContent.trim().replace(/\s+/g, ' ');
          if (rawName.length > 2) {
            results.push({
              name: rawName,
              status: 'Rumored — launch date unconfirmed',
              expectedPrice: 'Price to be announced',
            });
          }
        }
      });

      return results;
    });

    await browser.close();
    browser = null;

    if (phones.length >= 3) {
      console.log(
        `[scraper] Live scrape successful — ${phones.length} upcoming devices retrieved.`
      );
      return phones;
    }

    console.warn(
      '[scraper] Insufficient results from live scrape. Activating fallback dataset.'
    );
    return FALLBACK_PHONES;
  } catch (err) {
    if (browser) {
      await browser.close().catch(() => {});
    }
    console.error('[scraper] Scrape encountered an error:', err.message);
    console.warn('[scraper] Activating fallback dataset.');
    return FALLBACK_PHONES;
  }
}

module.exports = { scrapeUpcomingPhones };
