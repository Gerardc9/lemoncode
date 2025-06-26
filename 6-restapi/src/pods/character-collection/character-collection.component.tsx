import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { CharacterEntityVm } from './character-collection.vm';
import { CharacterCard } from './components/character-card.component';
import * as classes from './character-collection.styles';

interface Props {
  characterCollection: CharacterEntityVm[];
  loading: boolean;
  showCreateButton: boolean;
  showDeleteButton: boolean;
  onCreateCharacter: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CharacterCollectionComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {
    characterCollection,
    loading,
    showCreateButton,
    showDeleteButton,
    onCreateCharacter,
    onEdit,
    onDelete,
  } = props;

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
        <Typography>Cargando personajes...</Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4" component="h1">
          Personajes de Rick & Morty
        </Typography>
        {showCreateButton && (
          <Button
            variant="contained"
            color="primary"
            onClick={onCreateCharacter}
          >
            Añadir personaje
          </Button>
        )}
      </div>

      <ul className={classes.list}>
        {characterCollection.map((character) => (
          <li key={character.id}>
            <CharacterCard
              character={character}
              showDeleteButton={showDeleteButton}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
