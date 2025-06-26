import * as apiModel from './api';
import * as viewModel from './character-collection.vm';

export const mapCharacterFromApiToVm = (
  character: apiModel.CharacterEntityApi
): viewModel.CharacterEntityVm => ({
  id: character.id.toString(),
  picture: character.image,
  name: character.name,
  species: character.species,
  status: character.status,
  gender: character.gender,
  location: character.location.name,
});

export const mapCharacterCollectionFromApiToVm = (
  characterCollection: apiModel.CharacterEntityApi[]
): viewModel.CharacterEntityVm[] =>
  characterCollection.map(mapCharacterFromApiToVm);
