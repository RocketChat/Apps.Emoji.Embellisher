import { IRead, IModify, IHttp, IPersistence } from "@rocket.chat/apps-engine/definition/accessors";
import { ISlashCommand, SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { sendNotification } from "../messages/sendNotification";
import { initiatorMessage } from "../messages/initiatorMessage";
import { getPrompt } from "../persistence/PromptPersistence";
import { llama } from "../llms/Inference";



export class EmbellishCommand implements ISlashCommand {
    public command: string = "embellish";
    public i18nDescription: string = "";
    public i18nParamsExample: string = "";
    public providesPreview: boolean = false;

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const subcommand = context.getArguments()[0];

        if (!subcommand) {
            await sendNotification(context, modify, read, "Please input a valid prompt or subcommand!");
            throw new Error("Error!");
        }

        switch (subcommand) {

            case "redo":
                let text = context.getArguments().slice(1).join(' ');
                const new_result = await llama(context, modify, read, http, text);
                await initiatorMessage(context, modify, text, new_result);
                break;

            default:
                let user = context.getArguments().join(' ')
                const preprompt = await getPrompt(context.getSender(), read.getPersistenceReader());
                const result = await llama(context, modify, read, http, user, preprompt);
                await initiatorMessage(context, modify, user, result);
                break;
        }
    }
}
