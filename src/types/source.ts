import type { Page } from "playwright";
import { sources } from "../constants/source";
import { actions } from "../constants/action";
import type { Comic } from "./comic";

export type Source = keyof typeof sources;
export type NavigationAction = (typeof actions)[keyof typeof actions];

type NavigationCallback = (page: Page, delay?: string) => Promise<Comic[]>;

export type SourceNavigation = Record<Source, Record<NavigationAction, NavigationCallback>>;

export type Choice<Value> = {
  value: Value;
  name?: string;
  description?: string;
  disabled?: boolean | string;
  type?: never;
};
