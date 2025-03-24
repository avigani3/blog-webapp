export interface Story {
  id: number;
  title: string;
  content: string;
  image: string;
}

export interface StoriesData {
  stories: Story[];
} 