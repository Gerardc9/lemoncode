import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import { CharacterEntityVm } from '../character-collection.vm';
import * as classes from './character-card.styles';

interface Props {
  character: CharacterEntityVm;
  showDeleteButton: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CharacterCard: React.FunctionComponent<Props> = (props) => {
  const { character, showDeleteButton, onEdit, onDelete } = props;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'success';
      case 'dead':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar src={character.picture} aria-label="Character">
            {character.name[0]}
          </Avatar>
        }
        title={character.name}
        subheader={`${character.species} - ${character.gender}`}
      />
      <CardContent>
        <div className={classes.content}>
          <CardMedia
            image={character.picture}
            title={character.name}
            style={{ height: 0, paddingTop: '56.25%' }}
          />
          <div className={classes.info}>
            <Chip
              label={character.status}
              color={getStatusColor(character.status)}
              size="small"
            />
            <Typography variant="body2" color="textSecondary">
              Location: {character.location}
            </Typography>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => onEdit(character.id)} aria-label="edit">
          <EditIcon />
        </IconButton>
        {showDeleteButton && (
          <IconButton
            onClick={() => onDelete(character.id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};
