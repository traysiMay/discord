import React from 'react'
import Discord from 'discord.js'
import { INVITE_HOST } from './constants';
export const DiscordContext = React.createContext()
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.login(process.env.REACT_APP_HENRY_TOKEN);
export const DiscordProvider = ({ children }) => {
    return (
        <DiscordContext.Provider value={{ client }}>
            {children}
        </DiscordContext.Provider>
    )
}