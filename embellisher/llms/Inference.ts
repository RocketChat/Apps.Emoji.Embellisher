import { IModify, IHttp, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { sendNotification } from '../messages/sendNotification';

// Model: llama3
export async function llama(
    context: SlashCommandContext,
    modify: IModify,
    read: IRead,
    http: IHttp,
    user: string,
    preprompt: string = "",
    temperature: number = 0.3
): Promise<string> {

    const url = "http://llama3-70b/v1"
    const model = "llama3"

    const prompt = `\nUser: ${user}`
    const query = `${preprompt} + ${prompt}`

    const headers = {
        "Content-Type": "application/json",
    };

    const body = {
        model,
        messages: [
            {
                role: "user",
                content: query,
            },
        ],
        temperature: temperature,
    };

    const response = await http.post(url + "/chat/completions", { headers, content: JSON.stringify(body) });

    if (!response.content) {
        await sendNotification(context, modify, read, "Something is wrong with AI. Please try again later");
        throw new Error("Something is wrong with AI. Please try again later");
    }

    const result = JSON.parse(response.content);

    return result.choices[0].message.content;
}
