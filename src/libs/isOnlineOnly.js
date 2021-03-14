export const isOnlineOnly = (tierList) => {
  let onlineOnly = true;
  for (const tier of tierList) {
    if (tier.online !== true) {
      onlineOnly = false;
    }
  }

  return onlineOnly;
};
