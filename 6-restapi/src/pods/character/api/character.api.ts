import { Character } from './character.api-model';
import { getCharacterLocal, saveCharacterLocal } from './character-local.api';
import { API_CONFIG } from '../../../config/api.config';

const baseUrl = API_CONFIG.realApiUrl;

export const getCharacter = async (id: string): Promise<Character> => {
  if (API_CONFIG.useLocalServer) {
    return getCharacterLocal(id);
  }

  try {
    const response = await fetch(`${baseUrl}/character/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const character: Character = await response.json();
    return character;
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
};

export const saveCharacter = async (character: Character): Promise<boolean> => {
  if (API_CONFIG.useLocalServer) {
    return saveCharacterLocal(character);
  }

  return true;
};
