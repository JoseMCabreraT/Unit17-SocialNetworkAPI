import db from '../config/connection.js';
import { Thought, User } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getRandomName } from './data.js'; //Is this neccessary?

try {
  await db();
  await cleanDB();

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];

    users.push({
      first,
      last,
    });
  }

  // Add users to the collection and await the results
  const userData = await User.create(users);

  // Add thoughts to the collection and await the results
  await Thought.create({
    name: 'UCLA',
    inPerson: false,
    users: [...userData.map(({ _id }: { [key: string]: any }) => _id)],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}

