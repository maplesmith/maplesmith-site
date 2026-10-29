# Design: Maplesmith

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape of the first page: Split Studio (the studio home); app pages lead with the app's own screen, document pages are a Long Document
- Theme: brand (the maple and paper of `assets/maplesmith-mark.svg`)
- Axes: light/geometric-sans/warm · posture: restrained

## Tokens
`tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(96.5% 0.010 87.5);  --color-paper-2: oklch(93.4% 0.013 87.5);  --color-paper-3: oklch(90.2% 0.015 87.5);
  --color-ink: oklch(29.2% 0.024 174.3);  --color-ink-2: oklch(37% 0.024 172);  --color-muted: oklch(49.7% 0.023 168.5);  --color-rule: oklch(84.9% 0.015 102.5);
  --color-accent: oklch(56% 0.148 35);  --color-accent-ink: oklch(98.5% 0.006 87.5);  --color-focus: oklch(54% 0.17 35);
  --color-board: oklch(29.2% 0.024 174.3);  --color-board-type: oklch(96.5% 0.010 87.5);
  --font-display: "Satoshi", ui-sans-serif, system-ui, sans-serif;  --font-body: var(--font-display);  --font-outlier: "Gambetta", ui-serif, Georgia, serif;
  --radius-card: 12px;  --radius-screen: 18px;  --radius-pill: 999px;  --rule-hair: 1px;  --shadow-card: none;
}
```
The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `tokens.css`.

- Paper is `#f6f3ec` and maple is `#bb4d32`, converted exactly; the mark uses the same two.
- Maple is a signal only: link underlines on hover, the current page in a section nav, focus. Never a fill behind text or a heading colour.
- Satoshi 400, 500 and 700; headings at 500, sentence case, roman. Gambetta 600 sets the wordmark and nothing else. Code uses the system mono.
- Labels and nav links are Satoshi a step smaller, sentence case, untracked. No mono labels, no capitals.

## Pictures
- The apps' own iPad captures, shown whole with an 18px radius and a soft shadow. No device frame, no drawn interface.
- One app per split row; the second row on a page mirrors the first and changes the ratio.

## Controls
- Primary: ink fill, paper type · 10px radius · 48px tall (the App Store link on each app page)
- Secondary: rule outline, ink type · same radius and height
- Text links: 500 weight, rule-coloured underline that turns maple on hover, 44px hit height

## Motion
- Character: still. Hover changes colour; a button presses 1px. No reveals. Under reduced motion everything ends at once.

## Exports
`tokens.css` and `base.css` in this project. Tailwind, DTCG or shadcn blocks are added here on request.
