export interface CourseAuthor {
  id?: number;
  firstName: string;
  lastName?: string;
}

export interface Person {
  id?: number;
  name: string;
  date: string;
  length: number;
  description: string;
  authors?: CourseAuthor[];
  isTopRated?: boolean;
}

export interface PeopleResponse {
  people: Person[];
  hasMorePeople: boolean;
}
