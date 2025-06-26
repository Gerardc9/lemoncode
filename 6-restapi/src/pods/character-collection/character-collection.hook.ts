import * as React from 'react';
import { CharacterEntityVm } from './character-collection.vm';
import { getCharacterCollection } from './api';
import { mapCharacterCollectionFromApiToVm } from './character-collection.mapper';

export const useCharacterCollection = () => {
  const [characterCollection, setCharacterCollection] = React.useState<
    CharacterEntityVm[]
  >([]);
  const [loading, setLoading] = React.useState(false);

  const loadCharacterCollection = async () => {
    try {
      setLoading(true);
      const apiCharacterCollection = await getCharacterCollection();
      const vmCharacterCollection = mapCharacterCollectionFromApiToVm(
        apiCharacterCollection
      );
      setCharacterCollection(vmCharacterCollection);
    } catch (error) {
      console.error('Error loading character collection:', error);
    } finally {
      setLoading(false);
    }
  };

  return { characterCollection, loadCharacterCollection, loading };
};
