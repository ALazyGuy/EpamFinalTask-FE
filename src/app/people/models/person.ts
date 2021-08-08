export interface CourseAuthor {
  id?: number;
  firstName: string;
  lastName?: string;
}

export interface Person {
  id?: number;
  fullName: string;
  cash: number;
  status: boolean;
  photoName: string;
}

export interface PeopleResponse {
  people: Person[];
  hasMorePeople: boolean;
}
