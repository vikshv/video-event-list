declare module '*.html' {
  const src: string;
  export default src;
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.mcss' {
  const classes: { [key: string]: string };
  export default classes;
}
