import mineflayer from 'mineflayer';
import { pathfinder, Movements, goals } from 'mineflayer-pathfinder';
import {isSmashMessage, parseSmashMessage, SmashMessage} from "./smashMessage";


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

/*bot.on('message', (jsonMsg) => {
    console.log("JSON message:", jsonMsg);
});*/

bot.on('messagestr', (messagestr) => {
    if(!isSmashMessage(messagestr)) return;

    let smashMessage: null | SmashMessage = parseSmashMessage(messagestr);

    if(!smashMessage) return;
    let username = smashMessage.username;
    let message = smashMessage.message;

    if (username === bot.username) return;

    if (message === 'come') {
        const player = bot.players[username]?.entity;
        if (player) {
            const { GoalFollow } = goals;
            bot.pathfinder.setGoal(new GoalFollow(player, 1));
        }
    } else if (message === 'fly') {
        const player = bot.players[username]?.entity;
        if (player) {
            bot.chat('Flying to you!');
            // Fly to the player's position
            bot.creative.flyTo(player.position).then(err => {
                console.log('Arrived at destination!');
            });
        }
    } else if (message === 'land') {
        // Stop flying by setting the bot back to the ground
        const currentPos = bot.entity.position;
        const groundPos = currentPos.clone();
        groundPos.y = Math.floor(groundPos.y); // Snap to block position

        bot.creative.flyTo(groundPos).then(r =>
            console.log('Landed successfully!')
        );
    }
});