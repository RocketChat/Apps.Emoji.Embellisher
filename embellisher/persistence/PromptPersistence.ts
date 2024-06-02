import { IPersistence, IPersistenceRead } from "@rocket.chat/apps-engine/definition/accessors";
import { RocketChatAssociationRecord, RocketChatAssociationModel } from "@rocket.chat/apps-engine/definition/metadata";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export async function getPrompt(user: IUser, persis: IPersistenceRead): Promise<string> {
    const associations: Array<RocketChatAssociationRecord> = [
        new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'message'),
        new RocketChatAssociationRecord(RocketChatAssociationModel.USER, user.id),
    ];

    let result: Array<string> = ["Emojify the following texts."];
    const records: Array<{ preprompt: string }> = (await persis.readByAssociations(associations)) as Array<{ preprompt: string }>;

    if (records.length) {
        result = records.map(({ preprompt }) => preprompt);
    }

    return result[0];
}

export async function setPrompt(user: IUser, persistence: IPersistence, preprompt: string): Promise<boolean> {
    const associations: Array<RocketChatAssociationRecord> = [
        new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'message'),
        new RocketChatAssociationRecord(RocketChatAssociationModel.USER, user.id),
    ];

    try {
        await persistence.updateByAssociations(associations, { preprompt }, true);
    } catch (err) {
        console.warn(err);
        return false;
    }
    return true;
}
