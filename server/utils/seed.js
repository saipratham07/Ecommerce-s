/**
 *
 * Direct Root Seeder Script (Admin Fix)
 *
 */

const chalk = require('chalk');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

// Relative imports matching the root server folder architecture
const setupDB = require('./config/db'); // or './db' depending on your file location
const { ROLES } = require('./constants'); // or './constants/index'
const User = require('./models/user');
const Brand = require('./models/brand');
const Product = require('./models/product');
const Category = require('./models/category');

const args = process.argv.slice(2);
const email = args[0] || 'admin@demo.com';
const password = args[1] || 'admin123';

const NUM_PRODUCTS = 100;
const NUM_BRANDS = 10;
const NUM_CATEGORIES = 10;

const seedDB = async () => {
  try {
    let categories = [];

    console.log(`${chalk.blue('✓')} ${chalk.blue('Seed database started')}`);

    const existingUser = await User.findOne({ email });
    
    if (!existingUser) {
      console.log(`${chalk.yellow('!')} ${chalk.yellow('Seeding brand new admin user...')}`);
      const user = new User({
        email,
        password,
        firstName: 'admin',
        lastName: 'admin',
        role: ROLES?.Admin || 'ROLE ADMIN'
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      await user.save();
      console.log(`${chalk.green('✓')} ${chalk.green('Admin user seeded successfully.')}`);
    } else {
      // Force-upgrades your account if it already exists as a "Member"
      console.log(`${chalk.yellow('!')} ${chalk.yellow('User account found. Force-upgrading role status to Admin...')}`);
      existingUser.role = ROLES?.Admin || 'ROLE ADMIN';
      await existingUser.save();
      console.log(`${chalk.green('✓')} ${chalk.green('User account successfully elevated to Admin role.')}`);
    }

    // --- Mock Data Categories Seeding ---
    const categoriesCount = await Category.countDocuments();
    if (categoriesCount >= NUM_CATEGORIES) {
      console.log(`${chalk.yellow('!')} ${chalk.yellow('Sufficient categories exist, skipping category seed.')}`);
      categories = await Category.find().select('_id');
    } else {
      for (let i = 0; i < NUM_CATEGORIES; i++) {
        const category = new Category({
          name: faker.commerce.department(),
          description: faker.lorem.sentence(),
          isActive: true
        });
        await category.save();
        categories.push(category);
      }
      console.log(`${chalk.green('✓')} ${chalk.green('Categories seeded.')}`);
    }

    // --- Mock Data Brands Seeding ---
    const brandsCount = await Brand.countDocuments();
    if (brandsCount >= NUM_BRANDS) {
      console.log(`${chalk.yellow('!')} ${chalk.yellow('Sufficient brands exist, skipping brand seed.')}`);
    } else {
      for (let i = 0; i < NUM_BRANDS; i++) {
        const brand = new Brand({
          name: faker.company.name(),
          description: faker.lorem.sentence(),
          isActive: true
        });
        await brand.save();
      }
      console.log(`${chalk.green('✓')} ${chalk.green('Brands seeded.')}`);
    }

    // --- Mock Data Products Seeding ---
    const productsCount = await Product.countDocuments();
    if (productsCount >= NUM_PRODUCTS) {
      console.log(`${chalk.yellow('!')} ${chalk.yellow('Sufficient products exist, skipping product seed.')}`);
    } else {
      const brands = await Brand.find().select('_id');
      for (let i = 0; i < NUM_PRODUCTS; i++) {
        const randomCategoryIndex = Math.floor(Math.random() * categories.length);
        const product = new Product({
          sku: faker.string.alphanumeric(10),
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          quantity: Math.floor(Math.random() * 100) + 1,
          price: faker.commerce.price(),
          taxable: Math.random() < 0.5,
          isActive: true,
          brand: brands[Math.floor(Math.random() * brands.length)]._id,
          category: categories[randomCategoryIndex]._id
        });
        await product.save();
        await Category.updateOne({ _id: categories[randomCategoryIndex]._id }, { $push: { products: product._id } });
      }
      console.log(`${chalk.green('✓')} ${chalk.green('100 Products seeded and linked successfully.')}`);
    }
  } catch (error) {
    console.log(`${chalk.red('x')} ${chalk.red('Error while seeding database')}`);
    console.log(error);
  } finally {
    await mongoose.connection.close();
    console.log(`${chalk.blue('✓')} ${chalk.blue('Database connection closed safely.')}`);
  }
};

// Handle generic database connector setup initialization
const runSeeder = async () => {
  try {
    if (typeof setupDB === 'function') {
      await setupDB();
    } else {
      await mongoose.connect('mongodb://127.0.0.1:27017/mern_ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }
    await seedDB();
  } catch (err) {
    console.error('Initialization error:', err.message);
  }
};

runSeeder();