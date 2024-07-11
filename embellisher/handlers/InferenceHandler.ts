import { IModify, IHttp, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { sendNotification } from '../messages/sendNotification';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { SystemPrompt } from '../config/SystemPrompt';
import { getResponse } from '../persistence/PromptPersistence';

export async function inference(
    app: App,
    user: IUser,
    room: IRoom,
    modify: IModify,
    read: IRead,
    http: IHttp,
    text: string,
    redo: boolean = false,
    emojify: number = 50,
    temperature: number = 0.3,
): Promise<string> {

    const headers = {
        "Content-Type": "application/json",
    };

    const model_ver = await app.getAccessors().environmentReader.getSettings().getValueById('model');
    const model = model_ver.split('-')[0];
    const url = `http://${model_ver}/v1`;

    const delimiter = "<>"
    const instructs = "--"
    const prev = await getResponse(user, read.getPersistenceReader());

    const promptConfig = new SystemPrompt(
        redo,
        emojify,
        delimiter,
        instructs,
        prev,
    );

    let system_message = "";
    const use_case = await app.getAccessors().environmentReader.getSettings().getValueById('usecase');

    if(use_case == 'event-promotions') {
        system_message = await promptConfig.eventPromotions();
    } else {
        system_message = await promptConfig.communication();
    }

    let prompt = `${delimiter} ${text} ${delimiter}`
    if(redo) {
        prompt = text?.length ? `${instructs} ${text} ${instructs}` : `Only emojify text: ${emojify}%`;
    }

    const body = {
        model,
        messages: [
            { role: "system", content: system_message},
            { role: "user", content: prompt},
        ],
        temperature: temperature,
    };

    const response = await http.post(url + "/chat/completions", { headers, content: JSON.stringify(body) });

    if (!response.content) {
        await sendNotification(user, room, modify, read, "Something is wrong with AI. Please try again later");
        throw new Error("Something is wrong with AI. Please try again later");
    }

    let result = JSON.parse(response.content).choices[0].message.content;
    result = result.replace(/--|<>|<|>/g, '');

    return result
}
