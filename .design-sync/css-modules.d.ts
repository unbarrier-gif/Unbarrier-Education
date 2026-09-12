// Declaration-emit only (see build-dts.mjs). In the app these come from
// next-env.d.ts, which is generated and not committed.
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.css';
declare module '*.svg' {
  const src: string;
  export default src;
}
