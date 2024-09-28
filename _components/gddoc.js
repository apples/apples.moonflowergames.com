export default function ({ gd }) {
  const s = gd.split(" ");

  const kind = s.length == 1 ? "class" : s[0];
  const name = (s.length == 1 ? s[0] : s[1]).split(".")[0];
  const member = (s.length == 1 ? s[0] : s[1]).split(".")[1];

  const isPrivate = kind == "method" && member.startsWith("_");

  const kindEscaped = isPrivate ? "private-method" : kind;
  const nameEscaped = name.toLowerCase();
  const memberEscaped = member?.replaceAll('_', '-').replace(/^-/, '');

  let href = `https://docs.godotengine.org/en/stable/classes/class_${nameEscaped}.html`;
  let text = name;

  if (kind != "class") {
    href = href + `#class-${nameEscaped}-${kindEscaped}-${memberEscaped}`;
    text = name + "." + member;
    if (kind == "method") {
      text = text + "()";
    }
  }
  return `<a class="gd-link" href="${href}" target="_blank"><code>${text}</code></a>`;
};