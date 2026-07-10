import React, { createContext, useContext, useMemo, useReducer } from 'react';
import {
  DocumentSource,
  StoreOwnerProps,
  StoreSignupDraft,
  StoreSignupState,
  StoreSignupStep,
  STORE_SIGNUP_STEP_ORDER,
} from '../types/StoreSignupTypes';

type Action =
  | { type: 'SET_CPF'; cpf: string }
  | { type: 'SET_DOCUMENT_SOURCE'; source: DocumentSource }
  | { type: 'SET_SEARCHING'; isSearching: boolean }
  | { type: 'SET_EXISTING_MATCH'; match: StoreOwnerProps | null }
  | { type: 'APPLY_AUTOFILL' }
  | { type: 'DISMISS_AUTOFILL' }
  | { type: 'UPDATE_OWNER'; patch: Partial<StoreOwnerProps> }
  | { type: 'UPDATE_STORE'; patch: Partial<StoreSignupDraft> }
  | { type: 'UPDATE_ADDRESS'; patch: Partial<StoreSignupDraft['storeAddress']> }
  | { type: 'RESET' };

const initialState: StoreSignupState = {
  draft: { storeOwner: {}, storeAddress: {} },
  cpf: '',
  documentSource: 'manual',
  existingUserMatch: null,
  isSearchingCpf: false,
  hasAppliedAutofill: false,
};

function reducer(state: StoreSignupState, action: Action): StoreSignupState {
  switch (action.type) {
    case 'SET_CPF':
      return { ...state, cpf: action.cpf };
    case 'SET_DOCUMENT_SOURCE':
      return { ...state, documentSource: action.source };
    case 'SET_SEARCHING':
      return { ...state, isSearchingCpf: action.isSearching };
    case 'SET_EXISTING_MATCH':
      return { ...state, existingUserMatch: action.match };
    case 'APPLY_AUTOFILL': {
      if (!state.existingUserMatch) return state;
      return {
        ...state,
        hasAppliedAutofill: true,
        draft: { ...state.draft, storeOwner: { ...state.existingUserMatch } },
      };
    }
    case 'DISMISS_AUTOFILL':
      return { ...state, hasAppliedAutofill: false };
    case 'UPDATE_OWNER':
      return { ...state, draft: { ...state.draft, storeOwner: { ...state.draft.storeOwner, ...action.patch } } };
    case 'UPDATE_STORE':
      return { ...state, draft: { ...state.draft, ...action.patch } };
    case 'UPDATE_ADDRESS':
      return { ...state, draft: { ...state.draft, storeAddress: { ...state.draft.storeAddress, ...action.patch } } };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface StoreSignupContextValue {
  state: StoreSignupState;
  dispatch: React.Dispatch<Action>;
  stepOrder: StoreSignupStep[];
  goNext: (currentStep: StoreSignupStep, navigation: { navigate: (screen: string) => void }) => void;
  goBack: (currentStep: StoreSignupStep, navigation: { goBack: () => void }) => void;
}

const StoreSignupContext = createContext<StoreSignupContextValue | null>(null);

export function StoreSignupProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<StoreSignupContextValue>(() => {
    const stepOrder = STORE_SIGNUP_STEP_ORDER;

    return {
      state,
      dispatch,
      stepOrder,
      goNext: (currentStep, navigation) => {
        const index = stepOrder.indexOf(currentStep);
        const next = stepOrder[index + 1];
        if (next) navigation.navigate(next);
      },
      goBack: (_currentStep, navigation) => navigation.goBack(),
    };
  }, [state]);

  return <StoreSignupContext.Provider value={value}>{children}</StoreSignupContext.Provider>;
}

export function useStoreSignup() {
  const ctx = useContext(StoreSignupContext);
  if (!ctx) throw new Error('useStoreSignup precisa estar dentro de <StoreSignupProvider>');
  return ctx;
}