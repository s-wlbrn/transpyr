import { build, fake } from '@jackfranklin/test-data-bot';
import { randomInteger } from '../utils/randomInteger';

export const userBuilder = build('User', {
  fields: {
    _id: fake((f) => f.random.uuid()),
    name: fake((f) => f.name.findName()),
    email: fake((f) => f.internet.email()),
    createdAt: fake((f) => f.date.past()),
    photo: 'default.jpeg',
    tagline: fake((f) => f.lorem.sentence()),
    bio: fake((f) => f.lorem.paragraph()),
    interests: fake((f) => f.lorem.sentence()),
    favorites: Array(randomInteger(0, 20)).fill(fake((f) => f.random.uuid())),
    privateFavorites: fake((f) => f.random.boolean()),
  },
  postBuild: (user) => {
    user.id = user._id;
    return user;
  },
});
