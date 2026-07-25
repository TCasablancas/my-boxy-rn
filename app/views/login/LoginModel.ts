export interface LoginFormData {
	emailOrUser: string;
	password: string;
}

export interface LoginFormErrors {
	emailOrUser?: string;
	password?: string;
}

export interface LoginViewModel {
	formData: LoginFormData;
	formErrors: LoginFormErrors;
	isSubmitting: boolean;
	canSubmit: boolean;
	onChangeEmailOrUser: (value: string) => void;
	onChangePassword: (value: string) => void;
	onSubmitLogin: () => Promise<void>;
	isKeepConnectedEnabled: boolean;
	onChangeKeepConnected: (value: boolean) => void;
}
