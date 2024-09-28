import lume from "lume/mod.ts";
import metas from "lume/plugins/metas.ts";
import search from "lume/plugins/search.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import date from "lume/plugins/date.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";
import prism from "lume/plugins/prism.ts";
import favicon from "lume/plugins/favicon.ts";
import inline from "lume/plugins/inline.ts";
import ogImages from "lume/plugins/og_images.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import type { Data } from "lume/core/file.ts";
import gitDate, { gitDate as gitDateFn } from "./_plugins/gitDate.ts";

import browserslist from 'npm:browserslist';
import { browserslistToTargets } from 'npm:lightningcss-wasm';
import namedCodeBlocks from "npm:markdown-it-named-code-blocks";
import container from "npm:markdown-it-container";
import { full as emoji } from 'npm:markdown-it-emoji';
import twemoji from 'npm:@twemoji/api';
import toc, { linkInsideHeader } from "https://deno.land/x/lume_markdown_plugins@v0.7.1/toc.ts";

import "./_plugins/prism-gdscript.js";
import "./_plugins/prism-line-numbers.js";

const containerPlugin = (name: String, open: (m) => String, close: () => String) => {
    const re = new RegExp(`^${name}\\s+(.*)$`);
    return [container, name, {
        render: (tokens, idx) => {
            if (tokens[idx].nesting === 1) {
                return open(tokens[idx].info.trim().match(re));
            } else {
                return close();
            }
        }
    }];
};

const markdown = {
    plugins: [
        namedCodeBlocks,
        emoji,
        containerPlugin("section", (_) => `<section>`, () => `</section>`),
        containerPlugin("aside", (_) => `<aside>`, () => `</aside>`),
        containerPlugin("note", (_) => `<div class="alert alert-note"><p class="alert-label">🔔 Note</p>`, () => `</div>`),
        containerPlugin("details", (m) => `<details><summary>${m[1]}</summary>`, () => `</details>`),
    ],
    rules: {
        emoji: (token, idx) => twemoji.parse(token[idx].content),
    },
};

const site = lume({ location: new URL("https://apples.moonflowergames.com/") }, { markdown });

site
    .copy("assets", ".")
    .copy([".png", ".webm"])
    .use(ogImages())
    .use(metas())
    .use(search())
    .use(date())
    .use(gitDate())
    .use(prism())
    .use(inline({ copyAttributes: [/^data-/, "class", "role", /^aria-/] }))
    .use(toc({
        anchor: linkInsideHeader({ content: "#" }),
    }))
    .use(minifyHTML({
        options: {
            keep_spaces_between_attributes: true,
        }
    }))
    .use(lightningCss({
        includes: "_styles",
        options: {
            targets: browserslistToTargets(browserslist('last 2 years')),
        },
    }))
    .use(sitemap())
    .use(favicon())
    .use(feed({
        output: ["/feed.rss", "/feed.json"],
        query: "type=article",
        sort: "date=desc",
        info: {
            title: "=site.name",
        },
        items: {
            title: "=title",
            description: "=description",
            published: "=date",
            updated: (data: Data) => gitDateFn(data.page, "modified"),
            content: "=children",
            image: "",
        }
    }));

export default site;
