import React from 'react';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { TextFieldComponent, SelectComponent } from '#common/components';
import { Lookup } from '#common/models';
import { formValidation } from './character.validations';
import { Character } from './character.vm';
import * as classes from './character.styles';

interface Props {
  character: Character;
  statusOptions: Lookup[];
  speciesOptions: Lookup[];
  genderOptions: Lookup[];
  onSave: (character: Character) => void;
}

export const CharacterComponent: React.FunctionComponent<Props> = (props) => {
  const { character, statusOptions, speciesOptions, genderOptions, onSave } =
    props;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        {character.image && (
          <CardMedia
            component="img"
            height="300"
            image={character.image}
            alt={character.name}
          />
        )}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {character.name}
          </Typography>
        </CardContent>
      </Card>

      <Formik
        onSubmit={onSave}
        initialValues={character}
        enableReinitialize={true}
        validate={formValidation.validateForm}
      >
        {() => (
          <Form className={classes.form}>
            <TextFieldComponent name="name" label="Nombre" />
            <SelectComponent
              name="status"
              label="Estado"
              items={statusOptions}
            />
            <SelectComponent
              name="species"
              label="Especie"
              items={speciesOptions}
            />
            <TextFieldComponent name="type" label="Tipo" />
            <SelectComponent
              name="gender"
              label="Género"
              items={genderOptions}
            />
            <TextFieldComponent name="origin" label="Origen" />
            <TextFieldComponent name="location" label="Ubicación" />
            <TextFieldComponent name="image" label="URL de Imagen" />
            <TextFieldComponent
              name="bestSentence"
              label="Mejor Frase"
              multiline={true}
              rows={3}
              placeholder="Escribe la mejor frase de este personaje..."
            />
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
