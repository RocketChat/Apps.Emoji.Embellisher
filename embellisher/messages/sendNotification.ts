import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

export async function sendNotification(
    user: IUser,
    room: IRoom,
    modify: IModify,
    read: IRead,
    text: string,
    emoji?
): Promise<void> {

    const notifier = read.getNotifier();
    const messageBuilder = notifier.getMessageBuilder();

    messageBuilder.setRoom(room).setText(text).setEmojiAvatar(emoji);

    await notifier.notifyUser(user, messageBuilder.getMessage());
}
