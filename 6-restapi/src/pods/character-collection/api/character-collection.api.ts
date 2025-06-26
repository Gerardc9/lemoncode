import {
  CharacterEntityApi,
  CharacterCollectionResponse,
} from './character-collection.api-model';
import {
  getCharacterCollectionLocal,
  deleteCharacterLocal,
} from './character-collection-local.api';
import { API_CONFIG } from '../../../config/api.config';

const baseUrl = API_CONFIG.realApiUrl;

export const getCharacterCollection = async (): Promise<
  CharacterEntityApi[]
> => {
  if (API_CONFIG.useLocalServer) {
    return getCharacterCollectionLocal();
  }

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

export const deleteCharacter = async (id: string): Promise<boolean> => {
  if (API_CONFIG.useLocalServer) {
    return deleteCharacterLocal(id);
  }

  return false;
};
