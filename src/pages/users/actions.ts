import { createUser, deleteUser } from '../../shared/api';

type CreateActionState = {
  error?: string;
  email: string;
};

export type CreateUserAction = (
  state: CreateActionState,
  formData: FormData
) => Promise<CreateActionState>;

export function createUserAction({
  refetchUsers,
}: {
  refetchUsers: () => void;
}): CreateUserAction {
  return async (_, formData: FormData) => {
    const email = formData.get('email') as string;

    if (email === 'admin@gmail.com') {
      return {
        error: 'Admin account is not allowed',
        email,
      };
    }

    try {
      await createUser({
        email,
        id: crypto.randomUUID(),
      });

      refetchUsers();

      return {
        email: '',
      };
    } catch {
      return {
        email,
        error: 'error while creating user',
      };
    }
  };
}

type DeleteUserActionState = {
  error?: string;
};

export const deleteUserAction =
  ({ refetchUsers }: { refetchUsers: () => void }) =>
  async (
    state: DeleteUserActionState,
    formData: FormData
  ): Promise<DeleteUserActionState> => {
    const id = formData.get('id') as string;
    try {
      await deleteUser(id);
      refetchUsers();
      return {};
    } catch {
      return {
        error: 'Error while deleting user',
      };
    }
  };
