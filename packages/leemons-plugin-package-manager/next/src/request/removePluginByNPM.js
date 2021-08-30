async function removePluginByNPM(name) {
  return leemons.api(
    {
      url: 'package-manager/remove',
      allAgents: true,
    },
    {
      method: 'POST',
      body: {
        name,
      },
    }
  );
}

export default removePluginByNPM;
