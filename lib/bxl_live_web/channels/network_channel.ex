defmodule BxlLiveWeb.NetworkChannel do
  use Phoenix.Channel
  alias BxlLiveWeb.MetroMonitor

  def join("network:live", _message, socket) do
    {:ok, MetroMonitor.get_current_state(), socket} #  {:ok, reply, socket}
  end

  def join("network:" <> _private_clluster_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end
end
