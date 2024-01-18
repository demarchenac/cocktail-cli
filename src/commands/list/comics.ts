import { writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";
import { select } from "@inquirer/prompts";
import { sourceChoices, sources } from "../../constants/source";
import { startSpinner } from "../../helpers/startSpinner";
import { scrape } from "../../scrape";
import type { ListOptions } from "./types";

export const listSourceComics = async (options: ListOptions) => {
  if (isNaN(+options.delay)) {
    console.log("The '--delay' must be a number expressing seconds between each navigation");
    return;
  }

  const source = await select({ message: "Pick a source", choices: sourceChoices });

  const spinner = await startSpinner("Fetching comics");

  const browser = await chromium.launch({ headless: !options.browserVisible });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://google.com");
  await page.getByLabel("Buscar", { exact: true }).click();
  await page.keyboard.type(sources[source]);
  await page.keyboard.press("Enter");

  const getComicsFromSource = scrape.source[source]["list-comics"];
  const comics = await getComicsFromSource(page, options.delay);

  spinner.succeed();

  const filename = `${source}-comics_${Date.now()}.json`;
  console.log(`Writing comics into: ${filename}`);
  writeFileSync(filename, JSON.stringify(comics, null, 2), "utf-8");

  await page.close();
  await context.close();
  await browser.close();
};
