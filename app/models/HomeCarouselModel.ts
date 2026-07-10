
export interface HomeCarouselProps {
  items: HomeCarouselItem[];
}

export interface HomeCarouselItem {
  id: string;
  title: string;
  imageUri: string;
  link: string;
}