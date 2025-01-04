export interface ScrapbookPage {
  id: string;
  background: string;
  elements: Array<{
    id: string;
    type: 'photo' | 'sticker' | 'text' | 'drawing';
    content: string;
    position: { x: number; y: number };
    rotation: number;
    scale: number;
  }>;
}

export interface Yearbook {
  id: string;
  title: string;
  description: string;
  theme: string;
  coverStyle: string;
  createdAt: string;
  lastModified: string;
  pages: any[];
  scrapbook: ScrapbookPage[];
}

export const yearbookStorage = {
  saveYearbook: (yearbook: Partial<Yearbook>) => {
    const yearbooks = JSON.parse(localStorage.getItem('yearbooks') || '[]');
    const newYearbook = {
      ...yearbook,
      id: yearbook.id || Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      pages: yearbook.pages || []
    };
    yearbooks.push(newYearbook);
    localStorage.setItem('yearbooks', JSON.stringify(yearbooks));
    return newYearbook;
  },

  getAllYearbooks: (): Yearbook[] => {
    return JSON.parse(localStorage.getItem('yearbooks') || '[]');
  },

  getYearbookById: (id: string): Yearbook | null => {
    const yearbooks = JSON.parse(localStorage.getItem('yearbooks') || '[]');
    return yearbooks.find((yb: Yearbook) => yb.id === id) || null;
  },

  updateYearbook: (id: string, updates: Partial<Yearbook>) => {
    const yearbooks = JSON.parse(localStorage.getItem('yearbooks') || '[]');
    const index = yearbooks.findIndex((yb: Yearbook) => yb.id === id);
    if (index !== -1) {
      yearbooks[index] = {
        ...yearbooks[index],
        ...updates,
        lastModified: new Date().toISOString()
      };
      localStorage.setItem('yearbooks', JSON.stringify(yearbooks));
    }
  }
}; 