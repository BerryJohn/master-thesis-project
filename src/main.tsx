import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import {
  Repo,
  BroadcastChannelNetworkAdapter,
  IndexedDBStorageAdapter,
  RepoContext,
  isValidAutomergeUrl,
} from "@automerge/react";
import type { TasksList } from "./db/db.ts";

export const repo = new Repo({
  storage: new IndexedDBStorageAdapter(),
  network: [new BroadcastChannelNetworkAdapter()],
});

const locationHash = document.location.hash.substring(1);

let handle;

if (isValidAutomergeUrl(locationHash)) {
  handle = await repo.find(locationHash);
} else {
  handle = repo.create<TasksList>({
    tasks: [],
  });
  document.location.hash = handle.url;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RepoContext.Provider value={repo}>
      <App docUrl={handle.url} />
    </RepoContext.Provider>
  </StrictMode>
);
