import { createUser } from '../../shared/api';

type CreateActionState = {
  error?: string;
  email: string;
};

export const createUserAction =
  ({ refetchUsers }: { refetchUsers: () => void }) =>
  async (prevState: CreateActionState, formData: FormData): Promise<CreateActionState> => {
    const email = formData.get('email') as string;

    if (email === 'admin@gmail.com') {
      return {
        error: 'Admin account is not allowed',
        email
      };
    }

    try {
      await createUser({
        email,
        id: crypto.randomUUID(),
      });

      refetchUsers();

      return {
        email: ""
      };
    } catch {
      return {
        email,
        error: 'error while creating user',
      };
    }
  };
