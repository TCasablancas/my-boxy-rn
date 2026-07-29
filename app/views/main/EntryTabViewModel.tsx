import { useEntryTabHooks } from './EntryTabHooks';
import { useEntryTabMenu } from './EntryTabMenu';

export default function useEntryTabViewModel() {
	const entryState = useEntryTabHooks();
	const { tabMenuData } = useEntryTabMenu({ isUserLoggedIn: entryState.isUserLoggedIn });

	return {
		...entryState,
		tabMenuData,
	};
}

