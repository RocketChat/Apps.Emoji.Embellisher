import { IRead, IHttp, IModify, IPersistence } from "@rocket.chat/apps-engine/definition/accessors";
import { UIKitBlockInteractionContext, IUIKitResponse } from "@rocket.chat/apps-engine/definition/uikit";
import { EmbellisherApp } from "../EmbellisherApp";
import { sendMessage } from "../messages/sendMessage";
import { sendNotification } from "../messages/sendNotification";


export class ExecuteBlockActionHandler {

    constructor(
        private readonly app: EmbellisherApp,
        private readonly read: IRead,
        private readonly http: IHttp,
        private readonly persistence: IPersistence,
        private readonly modify: IModify
    ) { }

    public async run(
        context: UIKitBlockInteractionContext
    ): Promise<IUIKitResponse> {

        const data = context.getInteractionData();

        try {
            const { actionId } = data

            switch(actionId) {
                case 'copy': {
                    break;
                }

                case 'edit': {
                    break;
                }

                case 'redo': {
                    break;
                }

                case 'send': {
                    const { value, user, room } = data;

                    if(room?.id){
                        if(value !== undefined) {
                            await sendMessage(value, user, room, this.modify)
                        } else {
                            await sendNotification(user, room, this.modify, this.read, 'Cannot send Invalid Data!');
                        }
                    }
                    break;
                }

                default: {
                    console.log("Invalid actionId");
                    break;
                }

            }
            return context.getInteractionResponder().successResponse();

        } catch(err) {
            console.log(err);
            return context.getInteractionResponder().errorResponse();
        }

    }
}
