const Delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

RegisterCommand(
  "createveh",
  async (source: number, args: string[], rawCommand: string) => {
    const [model] = args;
    const modelHash = GetHashKey(model);

    if (!IsModelInCdimage(modelHash)) return;

    RequestModel(modelHash);
    while (!HasModelLoaded(modelHash)) await Delay(100);

    const [x, y, z] = GetEntityCoords(PlayerPedId(), true);
    const h = GetEntityHeading(PlayerPedId());
    const veh = CreateVehicle(modelHash, x, y, z, h, true, true);

    while (!DoesEntityExist(veh)) await Delay(100);

    SetPedIntoVehicle(PlayerPedId(), veh, -1);
  },
  false,
);

emit(
  "chat:addSuggestion",
  "/createveh",
  "Spawns a vehicle with the specified model name.",
  [
    {
      name: "model",
      help: "The model name of the vehicle to spawn.",
    },
  ],
);
