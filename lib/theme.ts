// Every page is built on the theme tokens (app/globals.css) and works in both
// themes, so the theme applies site wide: dark by default, light only when the
// visitor chose it. (Until 2026-11-14 only redesigned pages were themed and the
// rest were forced light; that list is gone now that every page is redesigned.)
export const THEME_KEY = 'gs-theme';

// Runs before first paint (inlined in app/layout.tsx): marks JS as present and
// applies the saved theme.
export const THEME_INIT_SCRIPT = String.raw`(function(){var d=document.documentElement;d.classList.add('js');try{d.dataset.theme=localStorage.getItem('${THEME_KEY}')==='light'?'light':'dark'}catch(e){d.dataset.theme='dark'}})()`;
