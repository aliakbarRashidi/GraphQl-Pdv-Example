const resolvers = {
  Pdv: {
    id(pdv) {
      return pdv._id;
    },

    id(pdv, args, { Pdv }) {
      return Pdv.id(pdv);
    },

    coverageArea(pdv, args, { Pdv }) {
      return Pdv.coverageArea(pdv, args);
    },

    address(pdv, args, { Pdv }) {
      return Pdv.address(pdv);
    },
  },
  Query: {
    pdvs(root, { lastCreatedAt, limit }, { Pdv }) {
      return Pdv.all({ lastCreatedAt, limit });
    },

    pdv(root, { id }, { Pdv }) {
      return Pdv.findOneById(id);
    },
  },
  Mutation: {
    async createPdv(root, { input }, { Pdv }) {
      const id = await Pdv.insert(input);
      return Pdv.findOneById(id);
    },

    async updatePdv(root, { id, input }, { Pdv }) {
      await Pdv.updateById(id, input);
      return Pdv.findOneById(id);
    },

    removePdv(root, { id }, { Pdv }) {
      return Pdv.removeById(id);
    },
  },
  Subscription: {
    pdvCreated: pdv => pdv,
    pdvUpdated: pdv => pdv,
    pdvRemoved: id => id,
  },
};

export default resolvers;
