// server/config.js
module.exports = {
    AUTH0_DOMAIN: 'siqiyaoyao.auth0.com', // e.g., kmaida.auth0.com
    AUTH0_API_AUDIENCE: 'http://localhost:8083/api/', // e.g., 'http://localhost:8083/api/'
    MONGO_URI: process.env.MONGO_URI || 'mongodb://myapp:123456@ds113749.mlab.com:13749/bimweb',
    NAMESPACE:'http://myapp.com/roles',
  };