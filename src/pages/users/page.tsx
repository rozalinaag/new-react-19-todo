import { Suspense, use, useState, useTransition } from 'react';
import { createUser, deleteUser, fetchUsers } from '../../shared/api';
import { User } from '../../shared/types';

const defaultUsersPromise = fetchUsers();

export function UsersPage() {
  const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);

  const refetchUsers = () => {
    setUsersPromise(fetchUsers());
  };

  return (
    <main className="container mx-auto p-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline mb-10">Users</h1>

      <CreateUserForm refetchUsers={refetchUsers} />

      <Suspense fallback={<div>Loading...</div>}>
        <UsersList usersPromise={usersPromise} refetchUsers={refetchUsers} />
      </Suspense>
    </main>
  );
}

export function CreateUserForm({ refetchUsers }: { refetchUsers: () => void }) {
  const [email, setEmail] = useState('');

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      await createUser({
        email,
        id: crypto.randomUUID(),
      });

      startTransition(() => {
        refetchUsers();
        setEmail(email);
      });
    });
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        className="border p-2 rounded"
        value={email}
        disabled={isPending}
        onChange={(event) => setEmail(event.target.value)}
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        disabled={isPending}
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export function UsersList({
  usersPromise,
  refetchUsers,
}: {
  usersPromise: Promise<User[]>;
  refetchUsers: () => void;
}) {
  const users = use(usersPromise);

  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <UserCard key={user.id} user={user} refetchUsers={refetchUsers} />
      ))}
    </div>
  );
}

export function UserCard({
  user,
  refetchUsers,
}: {
  user: User;
  refetchUsers: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      deleteUser(user.id);

      startTransition(() => refetchUsers());
    });
  };

  return (
    <div className="border p-2 m-2 rounded bg-gray-100 flex gap-2 ">
      {user.email}

      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto"
        type="button"
        disabled={isPending}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
