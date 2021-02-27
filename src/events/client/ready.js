module.exports = (client) => {
    client.user.setActivity('open source code', { type: 'WATCHING' })
    .then(presence => console.log(`Activité du client mise sur ${presence.activities[0].name}`))
    .catch(console.error);
}
