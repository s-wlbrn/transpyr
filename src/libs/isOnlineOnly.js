export const isOnlineOnly = (tierList) => {
  let onlineOnly = true;
  tierList.forEach((tier) => {
    if (tier.online === false) {
      onlineOnly = false;
    }
  });

  return onlineOnly;
};
