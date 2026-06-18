// ../../js-packages/script-data/src/utils.ts
function getScriptData() {
  return window.JetpackScriptData;
}

// routes/connect/route.tsx
import { redirect } from "@wordpress/route";
var route = {
  beforeLoad: () => {
    const connectionStatus = getScriptData()?.connection?.connectionStatus;
    if (connectionStatus?.isRegistered) {
      throw redirect({ to: "/" });
    }
  }
};
export {
  route
};
