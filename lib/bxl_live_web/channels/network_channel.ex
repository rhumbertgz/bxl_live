defmodule BxlLiveWeb.NetworkChannel do
  use Phoenix.Channel

  def join("network:live", _message, socket) do
    BxlLiveWeb.MetroMonitor.restore_state()
    {:ok, :connected, socket} #  {:ok, reply, socket}
  end

  def join("network:" <> _private_clluster_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end
end
