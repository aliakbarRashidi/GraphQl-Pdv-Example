import { ObjectId } from 'mongodb';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { merge } from 'lodash';
import { PointObject, MultiPolygonObject } from 'graphql-geojson';

const resolvers = {};

resolvers.Point = PointObject;
resolvers.MultiPolygon = MultiPolygonObject;

resolvers.ObjID = new GraphQLScalarType({
  name: 'ObjID',
  description: 'Id representation, based on Mongo Object Ids',
  parseValue(value) {
    return ObjectId(value);
  },
  serialize(value) {
    return value.toString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ObjectId(ast.value);
    }
    return null;
  },
});

export default resolvers;

import pdvResolvers from './Pdv';
merge(resolvers, pdvResolvers);
