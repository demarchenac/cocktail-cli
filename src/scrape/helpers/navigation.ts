import type { SourceNavigation } from "../../types/source";
import { listComics } from "../asura/listComics";

export const source: SourceNavigation = {
  asura: {
    "list-comics": listComics,
  },
};
