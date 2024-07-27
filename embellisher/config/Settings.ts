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
        section: "InHouseModel",
		packageValue: 'llama3-70b',
	},
    {
		id: 'model-name',
		i18nLabel: 'Model Name',
		i18nDescription: 'User Hosted Model Name for text embellishment.',
		type: SettingType.STRING,
		required: false,
		public: true,
        section: "UserModel",
		packageValue: '',
	},
    {
		id: 'model-url',
		i18nLabel: 'Model URL',
		i18nDescription: 'User Hosted Model URL for text embellishment.',
		type: SettingType.STRING,
		required: false,
		public: true,
        section: "UserModel",
		packageValue: '',
	},
    {
		id: 'model-key',
		i18nLabel: 'Model Key',
		i18nDescription: 'User Hosted Model Key for text embellishment.',
		type: SettingType.PASSWORD,
		required: false,
		public: true,
        section: "UserModel",
		packageValue: '',
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
