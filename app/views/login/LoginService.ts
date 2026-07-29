import { supabase } from "../../service/supabase/supabase";
import { LoginFormData, LoginFormErrors } from './LoginModel';

export async function handleSignIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
		throw new Error(error.message);
  }

  return data?.user ?? null;
}

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
	const email = formData.emailOrUser.trim();
	const password = formData.password;

	if (!email.includes('@')) {
		throw new Error('Use um e-mail válido para entrar.');
	}

	return handleSignIn(email, password);
}

export async function handleSignOut() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error(error.message);
	}
}

