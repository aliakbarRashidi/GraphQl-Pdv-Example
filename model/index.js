import Pdv from './Pdv';

const models = {};
models.Pdv = Pdv;

export default function addModelsToContext(context) {
  const newContext = Object.assign({}, context);
  console.log(Pdv)
  Object.keys(models).forEach((key) => {
    newContext[key] = new models[key](newContext);
  });
  return newContext;
}