defmodule BxlLiveWeb.NetworkChannel do
  use Phoenix.Channel
  alias BxlLiveWeb.NetworkMonitor

  def join("network:live", _message, socket) do
    {:ok, NetworkMonitor.get_current_state(), socket}
  end

  def join("network:" <> _private_clluster_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end
end
