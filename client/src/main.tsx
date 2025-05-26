import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  Repo,
  IndexedDBStorageAdapter,
  RepoContext,
  isValidAutomergeUrl,
} from "@automerge/react";
import type { TasksList } from "./types/kanban.ts";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";

export const repo = new Repo({
  storage: new IndexedDBStorageAdapter(),
  network: [new BrowserWebSocketClientAdapter("ws://localhost:3030")],
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
