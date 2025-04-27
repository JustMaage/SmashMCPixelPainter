import mineflayer from 'mineflayer';
import { pathfinder, Movements, goals } from 'mineflayer-pathfinder';

const bot = mineflayer.createBot({
    host: 'smashmc.eu',
    port: 25565,
    username: 'MafoAI',
    version: '1.21',
    auth: 'microsoft'
});

// Wait until the bot is allowed to inject plugins
bot.once('inject_allowed', () => {
    bot.loadPlugin(pathfinder);
    console.log('initialized plugins');
});

bot.once('spawn', () => {
    const defaultMove = new Movements(bot);
    bot.pathfinder.setMovements(defaultMove);

    console.log('spawned');
});

bot.on('chat', (username, message) => {
    console.log("asdasdasd: " + message);
    if (username === bot.username) return;

    console.log("message: " + message);

    if (message === 'come') {
        const player = bot.players[username]?.entity;
        if (player) {
            const { GoalFollow } = goals;
            bot.pathfinder.setGoal(new GoalFollow(player, 1));
        }
    }
});