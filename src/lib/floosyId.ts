export default function generateFloosyId(): string {
  const floosyEpoch = BigInt(1753929600000);
  const timestamp = BigInt(Date.now()) - floosyEpoch;

  const machineId = BigInt(1);
  const processId = BigInt(1);
  const increment = BigInt(Math.floor(Math.random() * 4096));

  const floosyflake =
    (timestamp << BigInt(22)) |
    (machineId << BigInt(17)) |
    (processId << BigInt(12)) |
    increment;

  return floosyflake.toString();
}
