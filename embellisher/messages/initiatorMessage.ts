import { IModify } from '@rocket.chat/apps-engine/definition/accessors';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { ButtonStyle } from '@rocket.chat/apps-engine/definition/uikit';

export async function initiatorMessage(context: SlashCommandContext, modify: IModify, user: string, text: string): Promise<void> {

    const builder = await modify.getCreator().startMessage().setRoom(context.getRoom())
    const block = modify.getCreator().getBlockBuilder();

    block.addSectionBlock({
        text: block.newMarkdownTextObject(`${text}`),
    });

    block.addActionsBlock({
        blockId: "embellisherData",
        elements: [
            block.newButtonElement({
                actionId: "copyData",
                text: block.newPlainTextObject("Copy"),
            }),
            block.newButtonElement({
                actionId: "editData",
                text: block.newPlainTextObject("Edit"),
                value: text,
                style: ButtonStyle.PRIMARY,
            }),
            block.newButtonElement({
                actionId: "redoData",
                text: block.newPlainTextObject("Redo"),
                value: user,
                style: ButtonStyle.PRIMARY,
            }),
            block.newButtonElement({
                actionId: "sendData",
                text: block.newPlainTextObject("Send"),
                value: text,
                style: ButtonStyle.DANGER,
            }),
        ],
    });

    builder.setBlocks(block);
    await modify.getNotifier().notifyUser(context.getSender(), builder.getMessage());
}
