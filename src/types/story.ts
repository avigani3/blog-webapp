export interface Story {
  id: string;
  title: string;
  content: string;
  premium: boolean;
  tags: string[];
}

export interface StoriesData {
  stories: Story[];
} 