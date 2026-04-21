/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'swiper/css' {
  const content: any;
  export default content;
}

declare module 'swiper/css/pagination' {
  const content: any;
  export default content;
}

declare module 'swiper/css/navigation' {
  const content: any;
  export default content;
}

declare module 'swiper/css/thumbs' {
  const content: any;
  export default content;
}