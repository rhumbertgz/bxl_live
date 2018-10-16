import {Socket} from "phoenix"
import {getNetworkMap} from "./network_map"

let socket = new Socket("/socket", {params: {token: window.userToken}})
socket.connect()

var networkMap = getNetworkMap();

let channel = socket.channel("network:live", {})

channel.join()
  .receive("ok", payload => { 
    console.log("Current state", payload); 
    networkMap.initialize(payload.vehicles);
  })
  .receive("error", payload => { 
    console.log("Unable to join", payload); 
  });


channel.on("update_vehicles", payload => {
  networkMap.update(payload.vehicles)
}); 

export default socket;
