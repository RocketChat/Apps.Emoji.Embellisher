import { IPersistence, IPersistenceRead } from "@rocket.chat/apps-engine/definition/accessors";
import { RocketChatAssociationRecord, RocketChatAssociationModel } from "@rocket.chat/apps-engine/definition/metadata";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export async function getResponse(user: IUser, persistence: IPersistenceRead): Promise<string> {
    const associations: Array<RocketChatAssociationRecord> = [
        new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'message'),
        new RocketChatAssociationRecord(RocketChatAssociationModel.USER, user.id),
    ];

    let result: Array<string> = [""];
    const records: Array<{ response: string }> = (await persistence.readByAssociations(associations)) as Array<{ response: string }>;

    if (records.length) {
        result = records.map(({ response }) => response);
    }

    return result[0];
}

export async function setResponse(user: IUser, persistence: IPersistence, response: string): Promise<boolean> {
    const associations: Array<RocketChatAssociationRecord> = [
        new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'message'),
        new RocketChatAssociationRecord(RocketChatAssociationModel.USER, user.id),
    ];

    try {
        await persistence.updateByAssociations(associations, { response }, true);
    } catch (err) {
        console.warn(err);
        return false;
    }
    return true;
}
