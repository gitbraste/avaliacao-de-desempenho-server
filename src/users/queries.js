const getUsers = "SELECT * FROM users ORDER BY users.name";
const getUserByRegister = `SELECT * FROM users WHERE register = $1 ORDER BY users.name`;
const getUsersByManager = `SELECT * FROM users WHERE manager = $1 ORDER BY users.name`;
const getManagerUsers = `SELECT * FROM users WHERE register IN (SELECT manager FROM users) ORDER BY users.name;`;

module.exports = {
    getUsers,
    getUserByRegister,
    getUsersByManager,
    getManagerUsers
};