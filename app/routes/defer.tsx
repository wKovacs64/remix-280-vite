import * as React from 'react';
import { defer } from '@remix-run/node';
import { Await, ClientLoaderFunctionArgs, useLoaderData } from '@remix-run/react';

export async function loader() {
  const deferredDataPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('This is deferred server data');
    }, 4000);
  });

  return defer({ instantData: 'This is instant server data', deferredDataPromise });
}

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const clientData = localStorage.getItem('data');
  const serverData = await serverLoader<typeof loader>();

  return { clientData, serverData };
}

export default function DeferExampleRoute() {
  const { clientData, serverData } = useLoaderData<typeof clientLoader>();
  const { instantData, deferredDataPromise } = serverData;

  return (
    <div>
      <h1>Defer Example</h1>
      <p>Client data: {clientData}</p>
      <p>Instant server data: {instantData}</p>
      <p>
        Deferred server data:{' '}
        <React.Suspense fallback={<span>Loading...</span>}>
          <Await resolve={deferredDataPromise}>{(deferredData) => String(deferredData)}</Await>
        </React.Suspense>
      </p>
    </div>
  );
}

// Why do page refreshes (F5) only work if these are present? 👇

clientLoader.hydrate = true;

export function HydrateFallback() {
  // This only useful if the clientLoader itself is slow.
  // return <p>Waiting on clientLoader stuff...</p>;
  return null;
}
