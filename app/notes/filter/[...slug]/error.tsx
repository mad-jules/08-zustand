'use client';

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return (
    <div>
      <p>Could not fetch the list of tasks. {error.message}</p>
    </div>
  );
}
