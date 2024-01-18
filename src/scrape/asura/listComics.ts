import type { Locator, Page } from "playwright";
import type { Comic, ComicKind, ComicStatus } from "../../types/comic";
import { sources } from "../../constants/source";

const isNextBtnVisible = async (page: Page) => {
  try {
    const isVisible = await page.getByRole("link", { name: "Next", exact: true }).isVisible();
    return isVisible;
  } catch (error) {
    return false;
  }
};

const getLinkStatus = async (link: Locator): Promise<ComicStatus> => {
  const hasStatus = await link.locator("span.status").isVisible();
  if (!hasStatus) return "on-going";

  const status = await link.locator("span.status").textContent();

  if (!status) return "on-going";

  return status.toLowerCase().trim() as ComicStatus;
};

const parseLinkAsComic = async (link: Locator): Promise<Comic> => {
  const url = await link.getAttribute("href");
  const title = await link.getAttribute("title");
  const status = await getLinkStatus(link);

  const img = await link.getByRole("img");
  const croppedImage = await img.getAttribute("src");
  const alt = await img.getAttribute("alt");

  const secondUrlIndex = croppedImage?.lastIndexOf("https");
  const cover = secondUrlIndex ? croppedImage?.substring(secondUrlIndex) : croppedImage;

  const kind = alt?.replace("asura scans", "").replace("comic", "").trim() as ComicKind;

  return { kind, status, url: url as string, title: title as string, cover: cover as string };
};

export const listComics = async (page: Page, delay = "2"): Promise<Comic[]> => {
  if (isNaN(+delay)) throw new Error("The delay must be a number");

  await page.getByRole("link", { name: sources.asura }).first().click();

  await page.getByRole("link", { name: "Comics", exact: true }).click();

  const comics: Comic[] = [];

  let hasMorePagesLeft = await isNextBtnVisible(page);

  while (hasMorePagesLeft) {
    const links = await page.locator("div.bsx a").all();

    for (const link of links) {
      const comic = await parseLinkAsComic(link);
      comics.push(comic);
    }

    hasMorePagesLeft = await isNextBtnVisible(page);

    if (hasMorePagesLeft) {
      await page.waitForTimeout(+delay * 1000);
      await page.getByRole("link", { name: "Next", exact: true }).click();
    }
  }

  return comics;
};
