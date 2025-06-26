import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { Lookup } from '#common/models';
import { getCharacter, saveCharacter } from './api';
import {
  mapCharacterFromApiToVm,
  mapCharacterFromVmToApi,
} from './character.mappers';
import { Character, createEmptyCharacter } from './character.vm';
import { CharacterComponent } from './character.component';

// Opciones para los selectores
const statusOptions: Lookup[] = [
  { id: 'Alive', name: 'Vivo' },
  { id: 'Dead', name: 'Muerto' },
  { id: 'unknown', name: 'Desconocido' },
];

const speciesOptions: Lookup[] = [
  { id: 'Human', name: 'Humano' },
  { id: 'Alien', name: 'Alienígena' },
  { id: 'Humanoid', name: 'Humanoide' },
  { id: 'Robot', name: 'Robot' },
  { id: 'Animal', name: 'Animal' },
  { id: 'Disease', name: 'Enfermedad' },
  { id: 'unknown', name: 'Desconocido' },
];

const genderOptions: Lookup[] = [
  { id: 'Male', name: 'Masculino' },
  { id: 'Female', name: 'Femenino' },
  { id: 'Genderless', name: 'Sin género' },
  { id: 'unknown', name: 'Desconocido' },
];

export const CharacterContainer = () => {
  const [character, setCharacter] = React.useState<Character>(
    createEmptyCharacter()
  );
  const [loading, setLoading] = React.useState(false);
  const [notification, setNotification] = React.useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const showNotification = (message: string, severity: 'success' | 'error') => {
    setNotification({ open: true, message, severity });
  };

  const loadCharacter = async () => {
    if (id && id !== 'create') {
      try {
        setLoading(true);
        const apiCharacter = await getCharacter(id);
        const vmCharacter = mapCharacterFromApiToVm(apiCharacter);
        setCharacter(vmCharacter);
      } catch (error) {
        console.error('Error loading character:', error);
        showNotification('Error al cargar el personaje', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    loadCharacter();
  }, [id]);

  const handleSave = async (character: Character) => {
    try {
      setLoading(true);
      const apiCharacter = mapCharacterFromVmToApi(character);
      await saveCharacter(apiCharacter);
      showNotification('Personaje guardado exitosamente', 'success');
      setTimeout(() => navigate('/characters'), 1500);
    } catch (error) {
      console.error('Error saving character:', error);
      showNotification('Error al guardar el personaje', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <CharacterComponent
        character={character}
        statusOptions={statusOptions}
        speciesOptions={speciesOptions}
        genderOptions={genderOptions}
        onSave={handleSave}
      />
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};
