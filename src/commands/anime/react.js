const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { getJson } = require("@helpers/HttpUtils");
const { EMBED_COLORS } = require("@root/config");
const NekosLife = require("nekos.life");
const neko = new NekosLife();

const choices = ["hug", "kiss", "cuddle", "feed", "pat", "poke", "slap", "smug", "tickle", "wink"];

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "react",
  description: "anime reactions",
  enabled: true,
  category: "ANIME",
  cooldown: 5,
  command: {
    enabled: true,
    minArgsCount: 1,
    usage: "[reaction]",
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "category",
        description: "reaction type",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: choices.map((ch) => ({ name: ch, value: ch })),
      },
    ],
  },

  async messageRun(message, args) {
    const category = args[0].toLowerCase();
    if (!choices.includes(category)) {
      return message.safeReply(`Invalid choice: \`${category}\`.\nAvailable reactions: ${choices.join(", ")}`);
    }

    const embed = await genReaction(category, message.author);
    await message.safeReply({ embeds: [embed] });
  },

  async interactionRun(interaction) {
    const choice = interaction.options.getString("category");
    const embed = await genReaction(choice, interaction.user);
    await interaction.followUp({ embeds: [embed] });
  },
};

const genReaction = async (category, user) => {
  try {
    let imageUrl;

    // some-random api
    if (category === "wink") {
      const response = await getJson("https://cdn.discordapp.com/attachments/1203981520214302730/1211618636268175400/WARING.jpg?ex=65eedac9&is=65dc65c9&hm=7677f36a81cab9a361060fe8348f769c1c0c99ec5e0dbcb6223ae988be7c01bf&");
      if (!response.success) throw new Error("API error");
      imageUrl = response.data.link;
    }

    // neko api
    else {
      imageUrl = (await neko[category]()).url;
    }

    return new EmbedBuilder()
      .setImage("https://cdn.discordapp.com/attachments/1203981520214302730/1211618636268175400/WARING.jpg?ex=65eedac9&is=65dc65c9&hm=7677f36a81cab9a361060fe8348f769c1c0c99ec5e0dbcb6223ae988be7c01bf&")
      .setColor("Random")
      .setFooter({ text: `Requested By ${user.tag}` });
  } catch (ex) {
    return new EmbedBuilder()
      .setImage("https://cdn.discordapp.com/attachments/1203981520214302730/1211618636268175400/WARING.jpg?ex=65eedac9&is=65dc65c9&hm=7677f36a81cab9a361060fe8348f769c1c0c99ec5e0dbcb6223ae988be7c01bf&")
      .setColor(EMBED_COLORS.ERROR)
      .setFooter({ text: `Requested By ${user.tag}` });
  }
};
