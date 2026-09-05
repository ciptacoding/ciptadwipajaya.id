/* Default dummy analytics config for local/dev. In the Docker image this file is
 * regenerated from the container's environment on every start (see
 * docker/40-analytics-config.sh), so edit .env on the server + restart to change
 * the numbers, no rebuild. Values here are the fallback when no env is set. */
window.__ANALYTICS__ = {
  FOLLOWERS_BASE: 5000,
  VIEWS_BASE: 1000000,
  SUBS_BASE: 20000,
  YT_VIEWS_BASE: 36000000,
  VIEWS_TODAY_BASE: 14382,
};
