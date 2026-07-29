import { useMemo, useState } from 'react';
import { useLoginHooks } from './LoginHooks';
import { LoginViewModel } from './LoginModel';
import { submitLogin, validateLoginForm } from './LoginService';
import MainNavigation from '../../common/navigation/MainNavigation';

export function useLoginViewModel(): LoginViewModel {
	const {
		formData,
		isSubmitting,
		setIsSubmitting,
		hasFilledRequiredFields,
    isKeepConnectedEnabled,
    setIsKeepConnectedEnabled,
		onChangeEmailOrUser,
		onChangePassword,
	} = useLoginHooks();

	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [loginError, setLoginError] = useState<string | null>(null);
  const [hasEnabledKeepConnected, setHasEnabledKeepConnected] = useState(false);

	const formErrors = useMemo(() => {
		if (!hasSubmitted) {
			return {};
		}

		return validateLoginForm(formData);
	}, [formData, hasSubmitted]);

	const canSubmit = useMemo(() => {
		return hasFilledRequiredFields && !isSubmitting;
	}, [hasFilledRequiredFields, isSubmitting]);

	async function onSubmitLogin() {
		setHasSubmitted(true);
    setLoginError(null);
		const currentErrors = validateLoginForm(formData);

		if (Object.keys(currentErrors).length > 0) {
			return;
		}

		try {
			setIsSubmitting(true);
			const user = await submitLogin(formData);

			if (user) {
				MainNavigation.pop();
			}
		} catch (error) {
			setLoginError(error instanceof Error ? error.message : 'Não foi possível fazer login.');
		} finally {
			setIsSubmitting(false);
		}
	}

  const onChangeKeepConnected = useMemo(() => (value: boolean) => {
    setIsKeepConnectedEnabled(value);
    setHasEnabledKeepConnected(value);
  }, [hasEnabledKeepConnected, setHasEnabledKeepConnected]);

	return {
		formData,
		formErrors,
		isSubmitting,
		loginError,
		canSubmit,
		onChangeEmailOrUser,
		onChangePassword,
		onSubmitLogin,
    isKeepConnectedEnabled,
    onChangeKeepConnected,
	};
}
