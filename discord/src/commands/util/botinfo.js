const { Command, Embed, Button } = require('../../structures')

module.exports = class BotInfoCommand extends Command {
    constructor() {
        super({
            name: 'botinfo',
            description: 'View my informations',
            category: 'util',
            botPermissions: ['embedLinks']
        })
    }
    async run (message) {
        const dev = await this.client.getRESTUser(process.env.OWNER_ID)

        const embed = new Embed()
        embed.setTitle(this.locale.get('commands.botinfo.embed.title'))
        embed.setDescription(this.locale.get('commands.botinfo.embed.description', {
            guilds: this.client.guilds.size,
            users: this.client.users.filter(user => !user.bot).length,
            commands: this.client.commands.size,
            dev: `${dev.username}#${dev.discriminator}`
        }))
        embed.setThumbnail(this.client.user.avatarURL)
        embed.setFooter(`By: ${dev.username}#${dev.discriminator}`, dev.avatarURL)

        const button = new Button()
        button.setStyle('LINK')
        button.setLabel(this.locale.get('helper.community'))
        button.setURL(process.env.SUPPORT_SERVER)

        message.replyC('', {
            embeds: [embed],
            components: [{
                type: 1,
                components: [button]
            }]
        })
    }
}