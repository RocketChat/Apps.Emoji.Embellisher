import { IRead, IModify, IHttp, IPersistence } from "@rocket.chat/apps-engine/definition/accessors";
import { ISlashCommand, SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { sendNotification } from "../messages/sendNotification";
import { EmbellisherApp } from "../EmbellisherApp";
import { inference } from "../handlers/InferenceHandler";
import { setResponse } from "../persistence/PromptPersistence";
import { initiatorMessage } from "../messages/initiatorMessage";
import { setEmoji } from "../persistence/EmojiPersistence";
import { helpMessage } from "../helpers/helpMessage";

export class EmbellishCommand implements ISlashCommand {

    public constructor(private readonly app: EmbellisherApp) {}

    public command: string = "embellish";
    public i18nDescription: string = "";
    public i18nParamsExample: string = "";
    public providesPreview: boolean = false;

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persistence: IPersistence
    ): Promise<void> {

        const user = context.getSender();
		const room = context.getRoom();
        const subcommand = context.getArguments()[0];

        if (!subcommand) {
            await sendNotification(user, room, modify, read, "Please input a valid prompt or subcommand!", ":warning:");
            throw new Error("Error!");
        }

        switch (subcommand) {

            case 'help':
                await sendNotification(user, room, modify, read, helpMessage);
                break;

            case "model":
                const model_ver = await this.app.getAccessors().environmentReader.getSettings().getValueById('model');
                const model = model_ver.split('-')[0];
                await sendNotification(user, room, modify, read, `Selected Model: ${model} \nModel's Version: ${model_ver}`);
                break;

            default:
                const user_text = context.getArguments().join(' ');
                await setEmoji(user, persistence, "50");
                await sendNotification(user, room, modify, read, "Your message is being generated. Please wait...", ":hourglass_flowing_sand:");

                const response = await inference(this.app, user, room, modify, read, http, user_text);
                await setResponse(user, persistence, response);

                const data = { user_text, response };
                await sendNotification(user, room, modify, read, data.response);
                await initiatorMessage(user, room, modify, data);
                break;
        }
    }
}
