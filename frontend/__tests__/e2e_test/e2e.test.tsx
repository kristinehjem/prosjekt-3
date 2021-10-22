import puppeteer from "puppeteer";

describe("App.tsx", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("contains correct header", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".header");
    const text = await page.$eval(".header", (e) => e.textContent);
    expect(text).toContain("IMDb TOP 250 Movies");
  });

  afterAll(() => browser.close());
});
