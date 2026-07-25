import { LoginFormData, LoginFormErrors } from './LoginModel';

function isEmail(value: string) {
	return /.+@.+\..+/.test(value);
}

export function validateLoginForm(formData: LoginFormData): LoginFormErrors {
	const errors: LoginFormErrors = {};
	const emailOrUser = formData.emailOrUser.trim();
	const password = formData.password.trim();

	if (!emailOrUser) {
		errors.emailOrUser = 'Informe seu e-mail ou usuario.';
	} else if (emailOrUser.includes('@') && !isEmail(emailOrUser)) {
		errors.emailOrUser = 'E-mail invalido.';
	}

	if (!password) {
		errors.password = 'Informe sua senha.';
	} else if (password.length < 6) {
		errors.password = 'A senha precisa ter ao menos 6 caracteres.';
	}

	return errors;
}

export async function submitLogin(formData: LoginFormData) {
	return formData;
}
