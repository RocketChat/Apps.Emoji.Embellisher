import { IModify, IPersistence, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { TextObjectType } from "@rocket.chat/apps-engine/definition/uikit";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { getInteractionRoomData, storeInteractionRoomData } from "../persistence/RoomPersistence";

export async function forwardModal(
    value,
    user: IUser,
    room: IRoom | undefined,
    read: IRead,
    persistence: IPersistence,
    modify: IModify,
): Promise<IUIKitModalViewParam> {

    let roomId;
    const viewId = "frwd-modal";
    const block = modify.getCreator().getBlockBuilder();

    if(room?.id) {
        roomId = room.id
        await storeInteractionRoomData(persistence, user.id, roomId);
    } else {
        roomId = (await getInteractionRoomData(read.getPersistenceReader(), user.id)).roomId;
    }

    block.addInputBlock({
        blockId: "room-block",
        label: {
            text: "Person or Channel",
            type: TextObjectType.PLAINTEXT,
        },
        element: block.newPlainTextInputElement({
            actionId: "room",
            placeholder: {
                text: "Enter person or channel name to forward the message",
                type: TextObjectType.PLAINTEXT,
            },
        }),
    });

    block.addDividerBlock();

    block.addSectionBlock({
        text: { text: `> ${value}`, type: TextObjectType.MARKDOWN, emoji: true },
    });

    return {
        id: viewId,
        title: block.newPlainTextObject('Forward Response'),
        close: block.newButtonElement({
            text: {
                type: TextObjectType.PLAINTEXT,
                text: "Close",
            },
        }),
        submit: block.newButtonElement({
            actionId: "frwded",
            text: {
                type: TextObjectType.PLAINTEXT,
                text: "Forward",
            },
        }),
        blocks: block.getBlocks(),
    };
}
