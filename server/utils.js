// src/utils.js

// Fungsi untuk memvalidasi UUID
function validateUUID(uuid) {
    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regex.test(uuid);
  }
  
  module.exports = {
    validateUUID
  };
  