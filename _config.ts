import lume from "lume/mod.ts";
import metas from "lume/plugins/metas.ts";
import search from "lume/plugins/search.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import date from "lume/plugins/date.ts";
import gitDate, { gitDate as gitDateFn } from "./_plugins/gitDate.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";
import prism from "lume/plugins/prism.ts";
import favicon from "lume/plugins/favicon.ts";
import inline from "lume/plugins/inline.ts";
import ogImages from "lume/plugins/og_images.ts";
import type { Data } from "lume/core/file.ts";
import namedCodeBlocks from "npm:markdown-it-named-code-blocks";
import container from "npm:markdown-it-container";
import { full as emoji } from 'npm:markdown-it-emoji';
import twemoji from 'npm:@twemoji/api';

import "./_plugins/prism-gdscript.js";
import "./_plugins/prism-line-numbers.js";

const markdown = {
    plugins: [
        namedCodeBlocks,
        emoji,
        [container, "section", {
            render: (tokens, idx) => {
                if (tokens[idx].nesting === 1) {
                    return `<section>`;
                } else {
                    return `</section>`;
                }
            }
        }],
        [container, "aside", {
            render: (tokens, idx) => {
                if (tokens[idx].nesting === 1) {
                    return `<aside>`;
                } else {
                    return `</aside>`;
                }
            }
        }],
        [container, "note", {
            render: (tokens, idx) => {
                if (tokens[idx].nesting === 1) {
                    return `<div class="alert alert-note"><p class="alert-label">🔔 Note</p>`;
                } else {
                    return `</div>`;
                }
            }
        }],
        [container, "details", {
            render: (tokens, idx) => {
                if (tokens[idx].nesting === 1) {
                    return `<details><summary>${tokens[idx].info.trim().match(/^details\s+(.*)$/)[1]}</summary>`;
                } else {
                    return `</details>`;
                }
            }
        }],
    ],
    rules: {
        emoji: (token, idx) => twemoji.parse(token[idx].content),
    },
};

const site = lume({}, { markdown });

site
    .copy("assets", ".")
    .copy([".png", ".webm"])
    .use(ogImages())
    .use(metas())
    .use(search())
    .use(date())
    .use(gitDate())
    .use(prism())
    .use(inline({ copyAttributes: [/^data-/, "class"] }))
    .use(minifyHTML({
        options: {
            keep_spaces_between_attributes: true,
        }
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
