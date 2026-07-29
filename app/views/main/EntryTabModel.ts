export type AppBottomsheetType = 'login' | 'store-required' | null;

export type UnifiedTabName = 'início' | 'curtidos' | 'minha loja' | 'compras' | 'mais';

export interface EntryTabBottomsheetState {
	isVisible: boolean;
	title: string;
	description: string;
	content: any;
}

export interface EntryTabAccessState {
	isUserLoggedIn: boolean;
	hasRegisteredStore: boolean;
	allowProtectedTabAccess: boolean;
}

export interface EntryTabMenuItem {
	name: UnifiedTabName;
	component: any;
	icon: any;
}