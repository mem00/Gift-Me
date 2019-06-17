const { db } = require('./models');

async function resetDb() {
  try {
    await db.sync({force: true});
    console.log('database sync\'d');
  } catch (e) {
    console.error(e);
  } finally {
    process.exit();
  }
}

resetDb();
