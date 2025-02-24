import { Suspense, useActionState } from 'react';
import { User } from '../../shared/types';
import { ErrorBoundary } from 'react-error-boundary';
import { CreateUserAction, DeleteUserAction } from './actions';
import { useUsers } from './use-users';

export function UsersPage() {
  const { useUsersList, createUserAction, deleteUserAction } = useUsers();

  return (
    <main className="container mx-auto p-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline mb-10">Users</h1>

      <CreateUserForm createUserAction={createUserAction} />

      <ErrorBoundary
        fallbackRender={(e) => (
          <div className="text-red-500">
            Something went wrong:{JSON.stringify(e)}
          </div>
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <UsersList
            useUsersList={useUsersList}
            deleteUserAction={deleteUserAction}
          />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

export function CreateUserForm({
  createUserAction,
}: {
  createUserAction: CreateUserAction;
}) {
  const [state, dispatch] = useActionState(createUserAction, {
    email: '',
  });

  return (
    <form className="flex gap-2" action={dispatch}>
      <input
        name="email"
        type="email"
        className="border p-2 rounded"
        defaultValue={state.email}
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        type="submit"
      >
        Add
      </button>

      {state.error && <div className="text-red-500">{state.error}</div>}
    </form>
  );
}

export function UsersList({
  useUsersList,
  deleteUserAction,
}: {
  useUsersList: () => User[];
  deleteUserAction: DeleteUserAction;
}) {
  const users = useUsersList();

  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          deleteUserAction={deleteUserAction}
        />
      ))}
    </div>
  );
}

export function UserCard({
  user,
  deleteUserAction,
}: {
  user: User;
  deleteUserAction: DeleteUserAction;
}) {
  const [state, handleDelete] = useActionState(deleteUserAction, {});

  return (
    <div className="border p-2 m-2 rounded bg-gray-100 flex gap-2 ">
      {user.email}

      <form className="ml-auto">
        <input type="hidden" name="id" value={user.id} />
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto disabled:bg-gray-400"
          formAction={handleDelete}
        >
          Delete{' '}
          {state.error && <div className="text-red-500">{state.error}</div>}
        </button>
      </form>
    </div>
  );
}
