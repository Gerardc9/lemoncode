import { Character } from './character.api-model';

const baseUrl = 'http://localhost:3000/api';

export const getCharacterLocal = async (id: string): Promise<Character> => {
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

export const saveCharacterLocal = async (
  character: Character
): Promise<boolean> => {
  try {
    const response = await fetch(`${baseUrl}/character/${character.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });
    return response.ok;
  } catch (error) {
    console.error('Error saving character:', error);
    return false;
  }
};
