const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

module.exports = {
  app: {
    name: 'Mern Ecommerce',
    apiURL: `${process.env.BASE_API_URL || 'api'}`,
    clientURL: process.env.CLIENT_URL || 'http://localhost:8080'
  },
  port: process.env.PORT || 3000,
  database: {
    url: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_ecommerce'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'mySuperSecureLocalSecret123!',
    tokenLife: '7d'
  },
  mailchimp: {
    key: process.env.MAILCHIMP_KEY || 'placeholder_key',
    listKey: process.env.MAILCHIMP_LIST_KEY || 'placeholder_list'
  },
  mailgun: {
    key: process.env.MAILGUN_KEY || 'placeholder_key',
    domain: process.env.MAILGUN_DOMAIN || 'placeholder_domain',
    sender: process.env.MAILGUN_EMAIL_SENDER || 'placeholder@example.com'
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || 'placeholder_google_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'placeholder_google_secret',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback'
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID || 'placeholder_fb_id',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'placeholder_fb_secret',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/api/auth/facebook/callback'
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'placeholder_aws_key',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'placeholder_aws_secret',
    region: process.env.AWS_REGION || 'us-east-2',
    bucketName: process.env.AWS_BUCKET_NAME || 'placeholder_bucket'
  }
};