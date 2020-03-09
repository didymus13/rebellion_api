const indexOf = require('lodash/indexOf')
// Check campaign Permissions
const can = function(permission, user, owner) {
  if (!user) return false
  if (indexOf(user.permissions, `${permission}:any`) > -1) return true
  return user.sub === owner
}

module.exports = can
