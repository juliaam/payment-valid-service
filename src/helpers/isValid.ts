export function checkIsValid(fimVigencia) {
  const now = new Date();

  if (fimVigencia < now) return false;
  return true;
}
