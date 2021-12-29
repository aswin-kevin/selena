const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function portScanner(ips, ports, options) {
  let data = {};
  let hyphen = options.length > 0 ? " -" : "";
  const cmd = `sudo masscan -p${ports.join(",")} ${ips.join(
    " "
  )}${hyphen}${options.join(" -")}`;
  console.log(cmd);
  const { stdout, stderr } = await execc(cmd);
  let lines = stdout.split("\n");
  for (let index = 0; index < lines.length; index++) {
    const element = lines[index];
    if (element.includes("Discovered")) {
      let items = element.split(" ");
      let ip = items[5];
      let port = items[3].split("/")[0];
      if (Object.keys(data).includes(ip)) {
        data[ip].push(port);
      } else {
        data[ip] = [port];
      }
    }
    if (index + 1 == lines.length) {
      return data;
    }
  }
}

export default async function Masscan(ips, ports, options) {
  const resp = await portScanner(ips, ports, options);
  return resp;
}
