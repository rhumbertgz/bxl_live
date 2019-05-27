defmodule BxlLive.NetworkSupervisor do
  @moduledoc false
  use Supervisor

  def start_link(state \\ []) do
    {:ok, _pid} = Supervisor.start_link(__MODULE__, state, [{:name, __MODULE__}])
  end

  def init(lines) do
    children = [
      worker(BxlLiveWeb.NetworkMonitor, [lines])
    ]
    supervise children, strategy: :one_for_one
  end

end
