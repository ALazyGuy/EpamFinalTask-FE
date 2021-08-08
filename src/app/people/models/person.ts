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
