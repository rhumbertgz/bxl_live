defmodule BxlLiveWeb.MetroMonitor do
  use GenServer
  require Logger
  @module Atom.to_string(__MODULE__) |> String.split_at(7) |> elem(1)

  def start_link(lines) do
    GenServer.start_link(__MODULE__, lines, name: :metro_monitor)
  end

  def update_map(node) do
    GenServer.cast(:metro_monitor, {:update_map, node})
  end

  def restore_state do
    GenServer.cast(:metro_monitor, :restore_state)
  end


  ## Callbacks
  @impl true
  def init(lines) do
    Logger.debug("#{@module}.init line: #{inspect lines}")
    {:ok, lines, {:continue, :init}}
  end

  @impl true
  def handle_continue(:init, lines) do
    Logger.info("#{@module} starting ...")
    token = Application.fetch_env!(:bxl_live, :token)
    Logger.info("#{@module} initializing MIVBM monitor ...")
    MIVBM.monitor_lines(lines, self(), token)
    Logger.info("#{@module} started ...")
    {:noreply, %{}}
  end

  @impl true
  def handle_cast({:update_vehicle_positions, vehicles}, state) do
    Logger.debug("#{@module}.update_vehicle_positions - #{inspect vehicles}")
    BxlLiveWeb.Endpoint.broadcast("network:live", "update_vehicles", %{vehicles: vehicles})
    state = Enum.reduce(vehicles, state, fn l, acc -> Map.put(acc, l.line, l) end)
    {:noreply, state}
  end

  @impl true
  def handle_cast(:restore_state, state) do
    vehicles = Map.values(state)
    Logger.debug("#{@module}.restore_state - #{inspect vehicles}")
    BxlLiveWeb.Endpoint.broadcast("network:live", "update_vehicles", %{vehicles: vehicles})
    {:noreply, state}
  end

end
