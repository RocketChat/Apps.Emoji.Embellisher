import { IPersistence, IPersistenceRead } from "@rocket.chat/apps-engine/definition/accessors";
import { RocketChatAssociationRecord, RocketChatAssociationModel } from "@rocket.chat/apps-engine/definition/metadata";

export async function storeInteractionRoomData(
    persistence: IPersistence,
    userId: string,
    roomId: string
): Promise<void> {
    const association = new RocketChatAssociationRecord(
        RocketChatAssociationModel.USER,
        `${userId}#RoomId`
    );
    await persistence.updateByAssociation(association, { roomId: roomId }, true);
};


export async function getInteractionRoomData(
    persistenceRead: IPersistenceRead,
    userId: string
): Promise<any> {
    const association = new RocketChatAssociationRecord(
        RocketChatAssociationModel.USER,
        `${userId}#RoomId`
    );
    const result = (await persistenceRead.readByAssociation(association)) as Array<any>;
    return result && result.length ? result[0] : null;
};


export async function clearInteractionRoomData(
    persistence: IPersistence,
    userId: string
): Promise<void> {
    const association = new RocketChatAssociationRecord(
        RocketChatAssociationModel.USER,
        `${userId}#RoomId`
    );
    await persistence.removeByAssociation(association);
};
