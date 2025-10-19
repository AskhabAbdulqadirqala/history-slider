export interface Slide {
  title: string;
  slides: {
    year: number;
    description: string;
  }[];
}

export enum SlideMovement {
  NEXT = 'next',
  PREV = 'prev',
  TO = 'to',
}
