
/**
 * Actions and Action Creators
 **/

export function setPort(port){
	return {
		type: 'PUSHER_SET_PORT',
		port: port
	}
}

export function setUsername(username){
	return {
		type: 'PUSHER_SET_USERNAME',
		username: username.replace(/[\W_]+/g,'')
	}
}

export function connect(){
	return {
		type: 'PUSHER_CONNECT'
	}
}

export function disconnect(){
	return {
		type: 'PUSHER_DISCONNECT'
	}
}

export function upgrade(){
	return {
		type: 'PUSHER_UPGRADE'
	}
}

export function reload(){
	return {
		type: 'PUSHER_RELOAD'
	}
}

export function restart(){
	return {
		type: 'PUSHER_RESTART'
	}
}

export function getConnections(){
	return {
		type: 'PUSHER_GET_CONNECTIONS'
	}
}

export function connectionAdded(connection){
	return {
		type: 'PUSHER_CONNECTION_ADDED',
		connection: connection
	}
}

export function connectionChanged(connection){
	return {
		type: 'PUSHER_CONNECTION_CHANGED',
		connection: connection
	}
}

export function connectionRemoved(connection){
	return {
		type: 'PUSHER_CONNECTION_REMOVED',
		connection: connection
	}
}

export function instruct(data = null){
	return {
		type: 'PUSHER_INSTRUCT',
		data: data
	}
}

export function getConfig(){
	return {
		type: 'PUSHER_GET_CONFIG'
	}
}

export function getVersion(){
	return {
		type: 'PUSHER_GET_VERSION'
	}
}

export function deliverBroadcast(method, params){
	return {
		type: 'PUSHER_DELIVER_BROADCAST',
		data: {
			method: method,
			params: params
		}
	}
}

export function deliverMessage(recipient, method, params){
	return {
		type: 'PUSHER_DELIVER_MESSAGE',
		data: {
			recipient: recipient,
			method: method,
			params: params
		}
	}
}

export function getRadio(){
	return {
		type: 'PUSHER_GET_RADIO'
	}
}

export function startRadio(uris){
	return {
		type: 'PUSHER_START_RADIO',
		uris: uris
	}
}

export function updateRadio(uris){
	return {
		type: 'PUSHER_UPDATE_RADIO',
		uris: uris
	}
}

export function stopRadio(){
	return {
		type: 'PUSHER_STOP_RADIO'
	}
}

export function radioStarted(radio){
	return {
		type: 'PUSHER_RADIO_STARTED',
		radio: radio
	}
}

export function radioChanged(radio){
	return {
		type: 'PUSHER_RADIO_CHANGED',
		radio: radio
	}
}

export function radioStopped(){
	return {
		type: 'PUSHER_RADIO_STOPPED'
	}
}

export function debug(message = null){
	return {
		type: 'PUSHER_DEBUG',
		message: message
	}
}

export function getQueueMetadata(){
	return {
		type: 'PUSHER_GET_QUEUE_METADATA'
	}
}

export function queueMetadataChanged(queue_metadata){
	return {
		type: 'PUSHER_QUEUE_METADATA_CHANGED',
		queue_metadata: queue_metadata
	}
}

export function addQueueMetadata(tlids = [], from_uri = null){
	return {
		type: 'PUSHER_ADD_QUEUE_METADATA',
		tlids: tlids,
		from_uri: from_uri
	}
}

/**
 * Snapcast actions
 * TODO: Figure out how to cleanly split this out to it's own service
 * but still share the pusher middleware connection
 **/

export function getSnapcast(){
	return {
		type: 'PUSHER_GET_SNAPCAST',
		data: {
			method: 'Server.GetStatus'
		}
	}
}

export function setSnapcastClientName(id, name){
	return {
		type: 'PUSHER_SET_SNAPCAST_CLIENT_NAME',
		id: id,
		name: name
	}
}

export function setSnapcastClientMute(id, mute){
	return {
		type: 'PUSHER_SET_SNAPCAST_CLIENT_MUTE',
		id: id,
		mute: mute
	}
}

export function setSnapcastClientVolume(id, percent){
	return {
		type: 'PUSHER_SET_SNAPCAST_CLIENT_VOLUME',
		id: id,
		percent: percent
	}
}

export function setSnapcastClientLatency(id, latency){
	return {
		type: 'PUSHER_SET_SNAPCAST_CLIENT_LATENCY',
		id: id,
		latency: latency
	}
}

export function deleteSnapcastClient(id){
	return {
		type: 'PUSHER_DELETE_SNAPCAST_CLIENT',
		id: id
	}
}

