import { IModify, IPersistence, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { TextObjectType } from "@rocket.chat/apps-engine/definition/uikit";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { getResponse } from "../persistence/PromptPersistence";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { getInteractionRoomData, storeInteractionRoomData } from "../persistence/RoomPersistence";

export async function redoModal(
    value,
    user: IUser,
    room: IRoom | undefined,
    read: IRead,
    persistence: IPersistence,
    modify: IModify,
): Promise<IUIKitModalViewParam> {

    let roomId;
    const viewId = "redo-modal";
    const response = await getResponse(user, read.getPersistenceReader());
    const block = modify.getCreator().getBlockBuilder();

    if(room?.id) {
        roomId = room.id
        await storeInteractionRoomData(persistence, user.id, roomId);
    } else {
        roomId = (await getInteractionRoomData(read.getPersistenceReader(), user.id)).roomId;
    }

    block.addSectionBlock({
        text: { text: `*User Text* \n${value}`, type: TextObjectType.MARKDOWN, emoji: true},
    });
    block.addSectionBlock({
        text: { text: `*LLM Response* \n${response}`, type: TextObjectType.MARKDOWN, emoji: true },
    });

    block.addDividerBlock();

    block.addInputBlock({
        blockId: "emoji-block",
        label: {
            text: "Emojification %",
            type: TextObjectType.PLAINTEXT,
        },
        element: block.newPlainTextInputElement({
            actionId: "emojify",
            placeholder: {
                text: "Enter emojification % (any number between 1 to 100%)",
                type: TextObjectType.PLAINTEXT,
            },
            initialValue: "50",
        }),
    });

    block.addInputBlock({
        blockId: "instruct-block",
        label: {
           text: "Instruct Prompt",
           type: TextObjectType.PLAINTEXT,
        },
        element: block.newPlainTextInputElement({
            actionId: "instructions",
            placeholder: {
               text: "Enter modification instructions",
               type: TextObjectType.PLAINTEXT,
            }
        }),
    });

    return {
        id: viewId,
        title: block.newPlainTextObject('Regenerate Response'),
        close: block.newButtonElement({
            text: {
               type: TextObjectType.PLAINTEXT,
               text: "Close",
            },
        }),
        submit: block.newButtonElement({
            actionId: "regenerate",
            text: {
               type: TextObjectType.PLAINTEXT,
               text: "Regenerate",
            },
        }),
        blocks: block.getBlocks(),
    };

}
