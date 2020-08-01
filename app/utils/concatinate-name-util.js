module.exports = (user) => {
    return user.last_name
            ? `${user.first_name} ${user.last_name}`
            : user.first_name;
}