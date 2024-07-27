import { IPersistence, IPersistenceRead } from "@rocket.chat/apps-engine/definition/accessors";
import { RocketChatAssociationRecord, RocketChatAssociationModel } from "@rocket.chat/apps-engine/definition/metadata";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export async function getEmoji(user: IUser, persistence: IPersistenceRead): Promise<string> {
    const associations: Array<RocketChatAssociationRecord> = [
        new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'emoji'),
        new RocketChatAssociationRecord(RocketChatAssociationModel.USER, user.id),
    ];

    let result: Array<string> = [""];
    const records: Array<{ emojiNum: string }> = (await persistence.readByAssociations(associations)) as Array<{ emojiNum: string }>;

    if (records.length) {
        result = records.map(({ emojiNum }) => emojiNum);
    }

    return result[0];
}

export async function setEmoji(user: IUser, persistence: IPersistence, emojiNum: string): Promise<boolean> {
    const associations: Array<RocketChatAssociationRecord> = [
        new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'emoji'),
        new RocketChatAssociationRecord(RocketChatAssociationModel.USER, user.id),
    ];

    try {
        await persistence.updateByAssociations(associations, { emojiNum }, true);
    } catch (err) {
        console.warn(err);
        return false;
    }
    return true;
}
