const DISCORD_TOKEN = '<discord token here>';
const CHARACTER_AI_TOKEN = '<character ai token here>';
const CHARACTER_ID = '<character ai character id here>';

import { Client, GatewayIntentBits } from 'discord.js';
import CharacterAI from 'node_characterai';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent]
});
const characterAI = new CharacterAI();

await characterAI.authenticateWithToken(CHARACTER_AI_TOKEN);
const chat = await characterAI.createOrContinueChat(CHARACTER_ID);
const response = await chat.sendAndAwaitResponse('ciao ^_^', true)
console.log(response);

client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);
})

client.on('messageCreate', async (msg) => {
    if (msg.mentions.users.find(user => user.id == client.user.id) !== undefined) {
        const response = await chat.sendAndAwaitResponse(msg.content, true)
        console.log(msg.content)
        console.log(response)
        msg.reply(response);
    }
})

console.log("Ok");
client.login(DISCORD_TOKEN);
