import { supabase } from '../../service/supabase/supabase';

type JsonRecord = Record<string, unknown>;

interface LoggedUser {
  id: string;
  email?: string;
}

function throwSupabaseError(context: string, error: { message: string } | null) {
  if (!error) return;
  throw new Error(`${context}: ${error.message}`);
}

function shuffleArray<T>(items: T[]) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const currentValue = copy[i];
    copy[i] = copy[randomIndex];
    copy[randomIndex] = currentValue;
  }

  return copy;
}

export async function getLoggedUser(): Promise<LoggedUser> {
  const { data, error } = await supabase.auth.getUser();

  throwSupabaseError('Error fetching logged user', error);

  if (!data.user) {
    throw new Error('No authenticated user found');
  }

  return {
    id: data.user.id,
    email: data.user.email,
  };
}

export async function getUserProfile(userId: string): Promise<JsonRecord | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  throwSupabaseError('Error fetching user profile', error);

  return data as JsonRecord | null;
}

export async function getLoggedUserProfile() {
  const user = await getLoggedUser();
  return getUserProfile(user.id);
}

export async function updateUserProfile(userId: string, profileData: JsonRecord) {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select('*')
    .single();

  throwSupabaseError('Error updating user profile', error);

  return data as JsonRecord | null;
}

export async function getProductsByUser(userId: string): Promise<JsonRecord[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', userId);

  throwSupabaseError('Error fetching products by user', error);

  return (data ?? []) as JsonRecord[];
}

export async function getRandomProducts(limit = 20, poolSize = 120): Promise<JsonRecord[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(poolSize);

  throwSupabaseError('Error fetching random products', error);

  const products = (data ?? []) as JsonRecord[];
  const shuffled = shuffleArray(products);
  return shuffled.slice(0, limit);
}

export async function getUserHomeData(productsLimit = 20) {
  const user = await getLoggedUser();

  const [profile, randomProducts] = await Promise.all([
    getUserProfile(user.id),
    getRandomProducts(productsLimit),
  ]);

  return {
    user,
    profile,
    randomProducts,
  };
}