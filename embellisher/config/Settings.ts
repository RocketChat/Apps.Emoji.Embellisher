import { ISetting, SettingType } from '@rocket.chat/apps-engine/definition/settings';

export const settings: Array<ISetting> = [
	{
		id: 'model',
		i18nLabel: 'Model selection',
		i18nDescription: 'LLM used for text embellishment.',
		type: SettingType.SELECT,
		values: [
			{ key: 'llama3-70b', i18nLabel: 'Llama3 70B' },
			{ key: 'mistral-7b', i18nLabel: 'Mistral 7B' },
		],
		required: true,
		public: true,
        section: "SelectModel",
		packageValue: 'llama3-70b',
	},
    {
        id: 'usecase',
		i18nLabel: 'Text embellishment use cases',
		i18nDescription: 'Different use cases in buisness for text embellishment',
		type: SettingType.SELECT,
		values: [
            { key: 'communication', i18nLabel: 'Text Communication' },
			{ key: 'event-promotions', i18nLabel: 'Event Promotions' },
			{ key: 'customer-support', i18nLabel: 'Customer Support' },
            { key: 'marketing-sales', i18nLabel: 'Marketing and Sales' }
		],
		required: true,
		public: true,
        section: "SelectCase",
		packageValue: 'communication',
    },
];
