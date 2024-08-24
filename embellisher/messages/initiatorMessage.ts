import { IModify } from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { ButtonStyle } from '@rocket.chat/apps-engine/definition/uikit';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

export async function initiatorMessage(
    user: IUser,
    room: IRoom,
    modify: IModify,
    data: any,
): Promise<void> {

    const builder = await modify.getCreator().startMessage().setRoom(room).setGroupable(true);
    const block = modify.getCreator().getBlockBuilder();

    block.addActionsBlock({
        blockId: "embellish",
        elements: [
            block.newButtonElement({
                actionId: "frwd",
                text: block.newPlainTextObject("Forward"),
                value: data.response,
            }),
            block.newButtonElement({
                actionId: "edit",
                text: block.newPlainTextObject("Edit"),
                value: data.response,
                style: ButtonStyle.PRIMARY,
            }),
            block.newButtonElement({
                actionId: "redo",
                text: block.newPlainTextObject("Redo"),
                value: data.user_text,
                style: ButtonStyle.PRIMARY,
            }),
            block.newButtonElement({
                actionId: "send",
                text: block.newPlainTextObject("Send"),
                value: data.response,
                style: ButtonStyle.DANGER,
            }),
        ],
    });

    builder.setBlocks(block);
    await modify.getNotifier().notifyUser(user, builder.getMessage());
}
