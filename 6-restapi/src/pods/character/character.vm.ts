export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: string;
  location: string;
  image: string;
  bestSentence: string;
}

export const createEmptyCharacter = (): Character => ({
  id: '',
  name: '',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: '',
  location: '',
  image: '',
  bestSentence: '',
});
