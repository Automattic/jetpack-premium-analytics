// ../../js-packages/script-data/src/utils.ts
function getScriptData() {
  return window.JetpackScriptData;
}

// routes/dashboard/route.tsx
import { redirect } from "@wordpress/route";
var route = {
  beforeLoad: () => {
    const connectionStatus = getScriptData()?.connection?.connectionStatus;
    if (!connectionStatus?.isRegistered) {
      throw redirect({ to: "/connect" });
    }
    const syncFinished = getScriptData()?.premium_analytics?.initial_full_sync_finished ?? 0;
    if (!syncFinished) {
      throw redirect({ to: "/syncing" });
    }
  }
};
export {
  route
};
