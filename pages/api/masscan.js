export default function handler(req, res) {
  const ips = req.body.ips;
  const ports = req.body.ports;
  res.status(200).json({ ips, ports });
}
