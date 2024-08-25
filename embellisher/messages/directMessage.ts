import { IRead, IModify } from "@rocket.chat/apps-engine/definition/accessors";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { getOrCreateDirectRoom } from "../helpers/getOrCreateDirectRoom";
import { welcomeMessage } from "../helpers/welcomeMessage";
import { sendMessage } from "./sendMessage";

export async function directMessage(
    user: IUser,
    read: IRead,
    modify: IModify
) {
    const appUser = (await read.getUserReader().getAppUser()) as IUser;
    const members = [user.username, appUser.username];

    const room = await getOrCreateDirectRoom(read, modify, members);

    const message = `Hello **${user.name}!** Thank you for installing the **Rocket.Chat - AI Emoji Embellisher App**. :raised_hands: \n` + welcomeMessage;

    const textMessageBuilder = modify
        .getCreator()
        .startMessage()
        .setRoom(room)
        .setSender(appUser)
        .setGroupable(true)
        .setParseUrls(false)
        .setText(message);

    await modify.getCreator().finish(textMessageBuilder);
}
