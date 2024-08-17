import type Site from "lume/core/site.ts";
import type { Page } from "lume/core/file.ts";
import { getGitDate } from "lume/core/utils/date.ts";

export const gitDate = (page: Page, type: "created" | "modified" = "created"): Date => {
  const { entry } = page.src;
  const info = entry.getInfo();

  return getGitDate(type, entry.src) || info.birthtime || new Date();
};

export default function () {
  return (site: Site) => {
    site.data('gitDate', gitDate);
  };
}

declare global {
  namespace Lume {
    export interface Data {
      gitDate: typeof gitDate;
    }
  }
}
