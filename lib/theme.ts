// Pages that are built on the theme tokens and look right in both themes.
// Every other page (not yet redesigned) uses hardcoded light colours, so it
// always renders light and the header hides the theme switch there.
// Add a path here once its page is redesigned.
export const THEMED_PATHS = ['/'];
export const THEME_KEY = 'gs-theme';

export function isThemed(pathname: string) {
  const p = pathname.replace(/\/+$/, '') || '/';
  return THEMED_PATHS.includes(p);
}

// Runs before first paint (inlined in app/layout.tsx): marks JS as present and
// applies the saved theme, only on themed pages.
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');try{var p=location.pathname.replace(/\/+$/,'')||'/';var t=localStorage.getItem('${THEME_KEY}');if(${JSON.stringify(
  THEMED_PATHS,
)}.indexOf(p)>-1&&(t==='dark'||t==='light'))d.dataset.theme=t}catch(e){}})()`;
