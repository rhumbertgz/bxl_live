defmodule BxlLiveWeb.PageController do
  use BxlLiveWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
