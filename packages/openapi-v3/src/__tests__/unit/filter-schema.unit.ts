// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/openapi-v3
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Entity, model, property} from '@loopback/repository';
import {expect} from '@loopback/testlab';
import {getFilterSchemaFor} from '../..';

describe('filterSchema', () => {
  @model({
    name: 'my-user-model',
  })
  class MyUserModel extends Entity {
    @property({id: true}) id: string;

    @property() age: number;
  }

  it('generate filter schema', () => {
    const schema = getFilterSchemaFor(MyUserModel);
    expect(MyUserModel.definition.name).to.eql('my-user-model');
    expect(schema).to.eql({
      properties: {
        where: {
          type: 'object',
        },
        fields: {
          type: 'object',
          properties: {
            id: {type: 'boolean'},
            age: {type: 'boolean'},
          },
        },
        offset: {type: 'integer', minimum: 0},
        limit: {type: 'integer', minimum: 1, examples: [100]},
        skip: {type: 'integer', minimum: 0},
        order: {type: 'array', items: {type: 'string'}},
      },
    });
  });
});
