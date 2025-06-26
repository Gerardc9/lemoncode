import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { linkRoutes } from '#core/router';
import { deleteCharacter } from './api';
import { useCharacterCollection } from './character-collection.hook';
import { CharacterCollectionComponent } from './character-collection.component';
import { API_CONFIG } from '../../config/api.config';

export const CharacterCollectionContainer = () => {
  const { characterCollection, loadCharacterCollection, loading } =
    useCharacterCollection();
  const navigate = useNavigate();

  React.useEffect(() => {
    loadCharacterCollection();
  }, []);

  const handleCreateCharacter = () => {
    navigate(linkRoutes.createCharacter);
  };

  const handleEdit = (id: string) => {
    navigate(linkRoutes.editCharacter(id));
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      '¿Estás seguro de que quieres eliminar este personaje?'
    );
    if (confirmed) {
      await deleteCharacter(id);
      loadCharacterCollection();
    }
  };

  return (
    <CharacterCollectionComponent
      characterCollection={characterCollection}
      loading={loading}
      showCreateButton={API_CONFIG.features.canCreate}
      showDeleteButton={API_CONFIG.features.canDelete}
      onCreateCharacter={handleCreateCharacter}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
