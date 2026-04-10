export function getPlan() {
  if (typeof document === "undefined") return null;
  return document.cookie.match(/plan=([^;]+)/)?.[1] || null;
}

export function isFreePlan(plan) {
  return plan === "free" || plan === "explorador";
}

export function canContact(plan) {
  return !isFreePlan(plan);
}

export function canSeePhone(plan) {
  return !isFreePlan(plan);
}