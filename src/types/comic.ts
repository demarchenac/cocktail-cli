export type ComicKind = "manga" | "manhwa" | "manhua" | "comic" | "novel";
export type ComicStatus = "on-going" | "dropped" | "completed";

export type Comic = {
  url: string;
  title: string;
  cover: string;
  status: ComicStatus;
  kind: ComicKind;
};
