import {
  CharacterEntityApi,
  CharacterCollectionResponse,
} from './character-collection.api-model';

const baseUrl = 'http://localhost:3000/api';

export const getCharacterCollectionLocal = async (): Promise<
  CharacterEntityApi[]
> => {
  try {
    const response = await fetch(`${baseUrl}/character`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data: CharacterCollectionResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const deleteCharacterLocal = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${baseUrl}/character/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting character:', error);
    return false;
  }
};
