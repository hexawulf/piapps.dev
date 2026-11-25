import { projects } from './src/data/projects.js?v=2';

const APP_RELEASE = {
  version: 'v1.1.0',
  releaseUrl: 'https://github.com/hexawulf/piapps.dev/releases/tag/v1.1.0',
  releaseDate: 'November 2026',
};

const alsoHosted = [
  {
    icon: '📚',
    title: 'Reading Habit Tracker',
    description: 'Visualize your reading life from a Goodreads export.',
    liveLink: 'https://mybooks.piapps.dev',
    codeLink: 'https://github.com/hexawulf/reading-habit-tracker',
  },
  {
    icon: '📊',
    title: 'TableTamer',
    description: 'Search, sort, edit, and export CSV tables in your browser.',
    liveLink: 'https://tabletamer.piapps.dev',
    codeLink: 'https://github.com/hexawulf/tabletamer',
  },
  {
    icon: '📈',
    title: 'p05.dev',
    description: 'Interactive probability distribution calculators and plots.',
    liveLink: 'https://p05.dev',
    codeLink: 'https://github.com/hexawulf/p05.dev',
  },
  {
    icon: '✂️',
    title: 'SnippetMate',
    description: 'Paste, tag, and full-text search your web and code snippets.',
    liveLink: 'https://snippetmate.com',
    codeLink: 'https://github.com/hexawulf/SnippetMate',
  },
];

const SVG_NS = 'http://www.w3.org/2000/svg';

function createIcon(paths, size = 14) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');

  for (const d of paths) {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    svg.appendChild(path);
  }
  return svg;
}

const ICONS = {
  external: () => createIcon(['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'], 14),
  code: () => createIcon(['m16 18 6-6-6-6', 'm8 6-6 6 6 6'], 14),
  tag: () => createIcon(['M12 2H2v10l9.29 9.29a1 1 0 0 0 1.42 0l6.58-6.58a1 1 0 0 0 0-1.42Z', 'M7 7h.01'], 13),
  box: () => createIcon(['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z', 'm3.3 7 8.7 5 8.7-5', 'M12 22V12'], 13),
};

function createExternalAnchor(href, className, label, iconFactory, ariaLabel) {
  const a = document.createElement('a');
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.className = className;
  if (ariaLabel) {
    a.setAttribute('aria-label', ariaLabel);
  }
  if (iconFactory) {
    a.appendChild(iconFactory());
  }
  const span = document.createElement('span');
  span.textContent = label;
  a.appendChild(span);
  return a;
}

function renderShowcase() {
  const grid = document.getElementById('showcase-grid');
  if (!grid) {
    return;
  }

  const fragment = document.createDocumentFragment();

  for (const project of projects) {
    const article = document.createElement('article');
    article.className = 'card';

    const top = document.createElement('div');
    top.className = 'card-top';

    const titleWrap = document.createElement('div');
    titleWrap.className = 'card-title-wrap';

    const iconEl = document.createElement('span');
    iconEl.className = 'card-icon';
    iconEl.setAttribute('aria-hidden', 'true');
    iconEl.textContent = project.icon;

    const titleEl = document.createElement('h3');
    titleEl.className = 'card-title';
    titleEl.textContent = project.title;

    titleWrap.appendChild(iconEl);
    titleWrap.appendChild(titleEl);
    top.appendChild(titleWrap);
    article.appendChild(top);

    const descEl = document.createElement('p');
    descEl.className = 'card-description';
    descEl.textContent = project.description;
    article.appendChild(descEl);

    if (Array.isArray(project.techStack) && project.techStack.length > 0) {
      const techList = document.createElement('ul');
      techList.className = 'tech-list';
      techList.setAttribute('aria-label', `${project.title} tech stack`);

      for (const tech of project.techStack) {
        const li = document.createElement('li');
        li.className = 'chip';
        li.textContent = tech;
        techList.appendChild(li);
      }
      article.appendChild(techList);
    }

    if ((project.version && project.releaseLink) || project.dockerLink) {
      const meta = document.createElement('div');
      meta.className = 'card-meta';

      if (project.version && project.releaseLink) {
        meta.appendChild(
          createExternalAnchor(
            project.releaseLink,
            'meta-pill',
            `Release ${project.version}`,
            ICONS.tag,
            `${project.title} release ${project.version}`
          )
        );
      }
      if (project.dockerLink) {
        meta.appendChild(
          createExternalAnchor(
            project.dockerLink,
            'meta-pill',
            'Docker Hub',
            ICONS.box,
            `${project.title} on Docker Hub`
          )
        );
      }
      article.appendChild(meta);
    }

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    if (project.liveLink) {
      actions.appendChild(
        createExternalAnchor(
          project.liveLink,
          'btn btn-primary',
          'Live',
          ICONS.external,
          `Open ${project.title} live site`
        )
      );
    }
    if (project.codeLink) {
      actions.appendChild(
        createExternalAnchor(
          project.codeLink,
          'btn btn-secondary',
          'Source',
          ICONS.code,
          `View ${project.title} source code on GitHub`
        )
      );
    }

    article.appendChild(actions);
    fragment.appendChild(article);
  }

  grid.replaceChildren(fragment);
}

function renderAlsoHosted() {
  const grid = document.getElementById('also-hosted-grid');
  if (!grid) {
    return;
  }

  const fragment = document.createDocumentFragment();

  for (const app of alsoHosted) {
    const article = document.createElement('article');
    article.className = 'mini-card';

    const head = document.createElement('div');
    head.className = 'mini-card-head';

    const iconEl = document.createElement('span');
    iconEl.className = 'mini-icon';
    iconEl.setAttribute('aria-hidden', 'true');
    iconEl.textContent = app.icon;

    const titleEl = document.createElement('h3');
    titleEl.className = 'mini-title';
    titleEl.textContent = app.title;

    head.appendChild(iconEl);
    head.appendChild(titleEl);
    article.appendChild(head);

    const descEl = document.createElement('p');
    descEl.className = 'mini-desc';
    descEl.textContent = app.description;
    article.appendChild(descEl);

    const links = document.createElement('div');
    links.className = 'mini-links';

    links.appendChild(
      createExternalAnchor(
        app.liveLink,
        'mini-link',
        'Live',
        ICONS.external,
        `Open ${app.title} live site`
      )
    );

    if (app.codeLink) {
      links.appendChild(
        createExternalAnchor(
          app.codeLink,
          'mini-link mini-link-muted',
          'Source',
          ICONS.code,
          `View ${app.title} source code on GitHub`
        )
      );
    }

    article.appendChild(links);
    fragment.appendChild(article);
  }

  grid.replaceChildren(fragment);
}

function initAboutDialog() {
  const openBtn = document.getElementById('about-open');
  const dialog = document.getElementById('about-dialog');
  const closeBtn = document.getElementById('about-close');
  const versionLink = document.getElementById('about-version-link');
  const releaseDateEl = document.getElementById('about-release-date');

  if (versionLink) {
    versionLink.textContent = APP_RELEASE.version;
    versionLink.href = APP_RELEASE.releaseUrl;
  }
  if (releaseDateEl) {
    releaseDateEl.textContent = APP_RELEASE.releaseDate;
  }

  if (!openBtn || !dialog || !closeBtn || typeof dialog.showModal !== 'function') {
    return;
  }

  openBtn.addEventListener('click', () => {
    if (!dialog.open) {
      document.body.classList.add('modal-open');
      dialog.showModal();
    }
  });

  closeBtn.addEventListener('click', () => {
    dialog.close();
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    openBtn.focus();
  });
}

function updateCopyrightYear() {
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderShowcase();
  renderAlsoHosted();
  initAboutDialog();
  updateCopyrightYear();
});
