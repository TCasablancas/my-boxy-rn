import { useMemo, useState } from 'react';
import { LoginFormData } from './LoginModel';

const INITIAL_FORM_DATA: LoginFormData = {
	emailOrUser: '',
	password: '',
};

export function useLoginHooks() {
	const [formData, setFormData] = useState<LoginFormData>(INITIAL_FORM_DATA);
  const [isKeepConnectedEnabled, setIsKeepConnectedEnabled] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const hasFilledRequiredFields = useMemo(() => {
		return formData.emailOrUser.trim().length > 0 && formData.password.trim().length > 0;
	}, [formData.emailOrUser, formData.password]);

	function onChangeEmailOrUser(value: string) {
		setFormData((prev) => ({ ...prev, emailOrUser: value }));
	}

  // function onSwitchChangeValue(value: boolean) {
  //   setIsSwitchEnabled(value);
  // }

	function onChangePassword(value: string) {
		setFormData((prev) => ({ ...prev, password: value }));
	}

	return {
		formData,
		isSubmitting,
		setIsSubmitting,
		hasFilledRequiredFields,
		onChangeEmailOrUser,
		onChangePassword,
    isKeepConnectedEnabled,
    setIsKeepConnectedEnabled,
	};
}
