import { IModify } from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export async function sendMessage(
    value: string,
    user: IUser,
    room: IRoom,
    modify: IModify,
): Promise<void> {

    const message = modify.getCreator().startMessage();

    message.setSender(user).setRoom(room).setText(value);

    await modify.getCreator().finish(message);
}
