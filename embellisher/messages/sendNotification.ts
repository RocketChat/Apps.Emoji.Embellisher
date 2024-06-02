import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

export async function sendNotification(
    context: SlashCommandContext,
    modify: IModify,
    read: IRead,
    text: string
): Promise<void> {
    const room = context.getRoom();
    const user = context.getSender();

    const notifier = read.getNotifier();
    const messageBuilder = notifier.getMessageBuilder();

    messageBuilder.setText(text)
    messageBuilder.setRoom(room);

    await notifier.notifyUser(user, messageBuilder.getMessage());
}
