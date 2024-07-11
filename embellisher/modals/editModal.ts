import { IModify, IPersistence, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { TextObjectType } from "@rocket.chat/apps-engine/definition/uikit";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { getInteractionRoomData, storeInteractionRoomData } from "../persistence/RoomPersistence";

export async function editModal(
    value,
    user: IUser,
    room: IRoom | undefined,
    read: IRead,
    persistence: IPersistence,
    modify: IModify,
): Promise<IUIKitModalViewParam> {

    let roomId;
    const viewId = "edit-modal";
    const block = modify.getCreator().getBlockBuilder();

    if(room?.id) {
        roomId = room.id
        await storeInteractionRoomData(persistence, user.id, roomId);
    } else {
        roomId = (await getInteractionRoomData(read.getPersistenceReader(), user.id)).roomId;
    }

    block.addInputBlock({
        blockId: "edit-block",
        label: {
            text: "Edit LLM Response",
            type: TextObjectType.PLAINTEXT,
        },

        element: block.newPlainTextInputElement({
            actionId: "editor",
            placeholder: {
                text: "Edit Here",
                type: TextObjectType.PLAINTEXT,
                emoji: true
            },
            initialValue: value,
            multiline: true
        }),
    });

    return {
        id: viewId,
        title: block.newPlainTextObject('Edit Response'),
        close: block.newButtonElement({
            text: {
                type: TextObjectType.PLAINTEXT,
                text: "Close",
            },
        }),
        submit: block.newButtonElement({
            actionId: "edited",
            text: {
                type: TextObjectType.PLAINTEXT,
                text: "Send",
            },
        }),
        blocks: block.getBlocks(),
    };

}
