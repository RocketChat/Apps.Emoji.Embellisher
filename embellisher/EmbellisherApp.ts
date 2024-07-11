import {
    IAppAccessors,
    IConfigurationExtend,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { EmbellishCommand } from './commands/EmbellishCommand';
import { settings } from './config/Settings';
import { UIKitBlockInteractionContext, IUIKitResponse } from '@rocket.chat/apps-engine/definition/uikit';
import { ExecuteBlockActionHandler } from './handlers/ExecuteBlockActionHandler';

export class EmbellisherApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async extendConfiguration(
        configuration: IConfigurationExtend
    ): Promise<void> {

        const embellishCommand: EmbellishCommand = new EmbellishCommand(this);
        await Promise.all([
            configuration.slashCommands.provideSlashCommand(embellishCommand),
            ...settings.map((setting) => configuration.settings.provideSetting(setting)),
        ]);
    }

    public async executeBlockActionHandler(
        context: UIKitBlockInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify,
    ): Promise<IUIKitResponse> {

        const handler = new ExecuteBlockActionHandler(
            this,
            read,
            http,
            persistence,
            modify
        );
        return await handler.run(context);
    }
}
