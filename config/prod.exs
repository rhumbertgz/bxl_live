use Mix.Config

config :bxl_live, BxlLiveWeb.Endpoint,
  load_from_system_env: true,
  http: [port: 8000],
  debug_errors: false,
  code_reloader: false,
  check_origin: false
  cache_static_manifest: "priv/static/cache_manifest.json"


# Do not include metadata nor timestamps in development logs
config :logger, level: :info

