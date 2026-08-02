export function captureClickIds() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  const gclid = params.get("gclid");
  if (fbclid) localStorage.setItem("ve_fbclid", fbclid);
  if (gclid) localStorage.setItem("ve_gclid", gclid);
}

export function getStoredClickIds() {
  if (typeof window === "undefined") return { fbclid: null, gclid: null };
  return {
    fbclid: localStorage.getItem("ve_fbclid"),
    gclid: localStorage.getItem("ve_gclid"),
  };
}