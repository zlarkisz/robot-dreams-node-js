const userModel = require('../models/userModel');
const UserPreferencesModel = require('../models/userPreferencesModel');

const userService = {
  getUsers: async () => {
    return await userModel.getAllUsers();
  },

  createUser: async (name, email) => {
    return await userModel.createUser(name, email);
  },

  getUserPreferences: async (userId) => {
    return await UserPreferencesModel.getUserPreferences(userId);
  },

  createUserPreference: async (userId, languageCode, preferredCommunication) => {
    return await UserPreferencesModel.createUserPreference(userId, languageCode, preferredCommunication);
  }
};

module.exports = userService;