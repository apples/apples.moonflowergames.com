
const NEW_LINE_EXP = /\n(?!$)/g;

Prism.hooks.add('before-insert', function (env) {
  env.highlightedCode = '<span class="line"></span>' + env.highlightedCode.replace(NEW_LINE_EXP, '\n<span class="line"></span>');
});

Prism.hooks.add('after-highlight', function (env) {
  if (env.element.matches(':not(.language-none)')) {
    env.element.parentElement.classList.add('line-numbers');

    const lineSpans = env.element.querySelectorAll('span.line');
    const linesNum = lineSpans.length;

    const startStr = env.element.getAttribute('data-start');
    if (startStr != null) {
      env.element.parentElement.setAttribute('style', `counter-reset: linenumber ${(parseInt(startStr) - 1)};`);
    }

    if (env.element.hasAttribute('data-highlight')) {
      const specs = env.element.getAttribute('data-highlight').split(' ');
      const startStr = env.element.getAttribute('data-start');
      const start = startStr ? parseInt(startStr) : 1;
      for (const spec of specs) {
        const [fromStr, toStr] = spec.split('-');
        const from = Math.max(0, parseInt(fromStr) - start);
        const to = Math.min(linesNum - 1, (toStr ? parseInt(toStr) - start : from));
        for (let i = from; i <= to; i++) {
          lineSpans[i].classList.add('hl');
        }
      }
    }
  }

  const nff = env.element.parentElement.querySelector('.named-fence-filename');
  if (nff) {
    nff.parentElement.prepend(nff);
  }
});
