module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Четко! Ботик ${client.user.tag} запустился!`);
	},
};