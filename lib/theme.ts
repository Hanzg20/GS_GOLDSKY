// Pages that are built on the theme tokens and look right in both themes.
// Every other page (not yet redesigned) uses hardcoded light colours, so it
// always renders light and the header hides the theme switch there.
// Add a path here once its page is redesigned.
export const THEMED_PATHS = ['/', '/apex', '/products'];
export const THEME_KEY = 'gs-theme';

export function isThemed(pathname: string) {
  // '/apex', '/apex/' and '/apex.html' (static hosts) are the same page
  const p = pathname.replace(/(\/index)?\.html$/, '').replace(/\/+$/, '') || '/';
  return THEMED_PATHS.includes(p);
}

// Runs before first paint (inlined in app/layout.tsx): marks JS as present and
// applies the theme, only on themed pages: dark by default, light only when
// the visitor chose it.
export const THEME_INIT_SCRIPT = String.raw`(function(){var d=document.documentElement;d.classList.add('js');try{var p=location.pathname.replace(/(\/index)?\.html$/,'').replace(/\/+$/,'')||'/';var t=localStorage.getItem('${THEME_KEY}');if(${JSON.stringify(
  THEMED_PATHS,
)}.indexOf(p)>-1)d.dataset.theme=t==='light'?'light':'dark'}catch(e){}})()`;
