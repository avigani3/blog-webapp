export interface Story {
  id: string;
  title: string;
  content: string;
  image: string;
}

export interface StoriesData {
  stories: Story[];
} 