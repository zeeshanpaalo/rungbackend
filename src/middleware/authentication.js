import pathToRegexp from "path-to-regexp";

export class RequestContext {
  constructor(hostname, config) {
    this.hostname = hostname;
    this.config = config;
  }

  getConfig() {
    return this.config;
  }
}

export const WHITELIST_URLS = [
  pathToRegexp("/login"),
];

export const authenticateRequest = async (
  config,
  req,
  res,
  next
) => {
  const domain = new URL(req.headers.origin).hostname;
  req.context = new RequestContext(domain, config);
  return next();
};

export default authenticateRequest;
