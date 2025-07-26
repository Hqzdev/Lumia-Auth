'use server';

import { z } from 'zod';

import { signIn } from './auth';

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  nickname: z.string().min(3).max(32),
});

const loginFormSchema = z.object({
  nickname: z.string().min(3).max(32),
  password: z.string().min(6),
});

export interface LoginActionState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data';
}

export const login = async (
  _: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> => {
  try {
    const validatedData = loginFormSchema.parse({
      nickname: formData.get('nickname'),
      password: formData.get('password'),
    });

    // Временная простая аутентификация для тестирования
    if (validatedData.nickname === 'test' && validatedData.password === 'test123') {
      await signIn('credentials', {
        nickname: validatedData.nickname,
        password: validatedData.password,
        redirect: false,
      });
      return { status: 'success' };
    }

    return { status: 'failed' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }
    return { status: 'failed' };
  }
};

export interface RegisterActionState {
  status:
    | 'idle'
    | 'in_progress'
    | 'success'
    | 'failed'
    | 'user_exists'
    | 'nickname_exists'
    | 'invalid_data';
}

export const register = async (
  _: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> => {
  try {
    const validatedData = registerFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
      nickname: formData.get('nickname'),
    });

    // Временная простая регистрация для тестирования
    if (validatedData.nickname === 'test') {
      return { status: 'nickname_exists' };
    }

    // Симулируем успешную регистрацию
    await signIn('credentials', {
      nickname: validatedData.nickname,
      password: validatedData.password,
      redirect: false,
    });

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }
    return { status: 'failed' };
  }
};
