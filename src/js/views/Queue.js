
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { hashHistory, Link } from 'react-router'
import { bindActionCreators } from 'redux'
import FontAwesome from 'react-fontawesome'

import Icon from '../components/Icon'
import Parallax from '../components/Parallax'
import TrackList from '../components/TrackList'
import Track from '../components/Track'
import Dater from '../components/Dater'
import ArtistSentence from '../components/ArtistSentence'
import Thumbnail from '../components/Thumbnail'
import Header from '../components/Header'
import URILink from '../components/URILink'

import * as helpers from '../helpers'
import * as uiActions from '../services/ui/actions'
import * as pusherActions from '../services/pusher/actions'
import * as spotifyActions from '../services/spotify/actions'
import * as mopidyActions from '../services/mopidy/actions'

class Queue extends React.Component{

	constructor(props){
		super(props)
	}

	removeTracks(track_indexes){
		var tlids = [];
		for (var i = 0; i < track_indexes.length; i++){
			var track = this.props.queue[track_indexes[i]];
			if (track.tlid !== undefined){
				tlids.push(track.tlid);
			}
		}

		if (tlids.length > 0){
			this.props.mopidyActions.removeTracks(tlids);
		}
	}

	playTrack(track){
		this.props.mopidyActions.changeTrack(track.tlid);
	}

	playTracks(tracks){
		this.props.mopidyActions.changeTrack(tracks[0].tlid);
	}

	reorderTracks(indexes, index){
		this.props.mopidyActions.reorderTracklist(indexes, index);
	}

	renderQueueStats(){
		var total_time = 0

		return (
			<div className="queue-stats grey-text">
				<span>{this.props.current_tracklist.length} tracks</span>
				&nbsp;&nbsp;|&nbsp;&nbsp;
				{this.props.current_tracklist.length > 0 ? <Dater type="total-time" data={this.props.current_tracklist} /> : <span>0 mins</span>}
			</div>
		)
	}

	renderArtwork(image){
		if (!image){
			return (
				<span className={this.props.radio_enabled ? 'artwork radio-enabled' : 'artwork'}>
					{this.props.radio_enabled ? <img className="radio-overlay" src="assets/radio-overlay.png" /> : null}
					<Thumbnail circle={this.props.radio_enabled} />
				</span>
			)
		}

		var uri = null
		if (this.props.current_track.album && this.props.current_track.album.uri){
			uri = this.props.current_track.album.uri;
		}
		return (
			<URILink
				className={this.props.radio_enabled ? 'artwork radio-enabled' : 'artwork'}
				type="album" 
				uri={uri}>
					{this.props.radio_enabled ? <img className="radio-overlay" src="assets/radio-overlay.png" /> : null}
					<Thumbnail image={image} circle={this.props.radio_enabled} />
			</URILink>
		)
	}

	render(){
		var current_track = null;
		var tracks = [];

		if (this.props.queue && this.props.tracks){
			for (var i = 0; i < this.props.queue.length; i++){
				var track = this.props.queue[i];

				// If we have the track in our index, merge it in.
				// We prioritise queue track over index track as queue has unique data, like which track
				// is playing and tlids.
				if (this.props.tracks.hasOwnProperty(track.uri)){
					track = Object.assign(
						{},
						this.props.tracks[track.uri],
						track,
						{
							playing: (this.props.current_track && this.props.current_track.tlid == track.tlid)
						}
					);
				}

				// Now merge in our queue metadata
				if (this.props.queue_metadata["tlid_"+track.tlid] !== undefined){
					track = Object.assign(
						{},
						track,
						this.props.queue_metadata["tlid_"+track.tlid]
					);
				}

				// Siphon off this track if it's a full representation of our current track (by tlid)
				if (this.props.current_track && this.props.current_track.uri == track.uri){
					current_track = track;
				}

				// Now add our compiled track for our tracklist
				tracks.push(track);
			}
		}

		var current_track_image = null;
		if (current_track){
			if (current_track.images !== undefined && current_track.images){
				current_track_image = helpers.sizedImages(current_track.images).large;
			}
		}

		var options = (
			<span>
				{this.props.spotify_enabled ? <button className="no-hover" onClick={e => this.props.uiActions.openModal('edit_radio')}>
					<Icon name="broadcast" />&nbsp;
					Radio
					{this.props.radio && this.props.radio.enabled ? <span className="flag blue">On</span> : null}
				</button> : null}
				<button className="no-hover" onClick={e => hashHistory.push(global.baseURL+'queue/history')}>
					<FontAwesome name="history" />&nbsp;
					History
				</button>
				<button className="no-hover" onClick={e => this.props.mopidyActions.clearTracklist()}>
					<FontAwesome name="trash" />&nbsp;
					Clear
				</button>
				<button className="no-hover" onClick={e => this.props.uiActions.openModal('add_to_queue', {})}>
					<FontAwesome name="plus" />&nbsp;
					Add URI
				</button>
			</span>
		)

		return (
			<div className="view queue-view">			
				<Header icon="play" className="overlay" title="Now playing" options={options} uiActions={this.props.uiActions} />
				<Parallax blur image={current_track_image} />
				<div className="content-wrapper">
				
					<div className="current-track">
						{this.renderArtwork(current_track_image)}
						<div className="title">
							{current_track ? <URILink type="track" uri={current_track.uri}>{current_track.name}</URILink> : <span>-</span>}
						</div>
						{current_track ? <ArtistSentence artists={current_track.artists} /> : <ArtistSentence />}
					</div>

					<section className="list-wrapper">
						<TrackList
							show_source_icon={true}
							context="queue"
							className="queue-track-list"
							tracks={tracks}
							removeTracks={track_indexes => this.removeTracks(track_indexes)}
							playTracks={tracks => this.playTracks(tracks)}
							playTrack={track => this.playTrack(track)}
							reorderTracks={(indexes, index) => this.reorderTracks(indexes, index)} />
					</section>
				
				</div>
			</div>
		);
	}
}


/**
 * Export our component
 *
 * We also integrate our global store, using connect()
 **/

const mapStateToProps = (state, ownProps) => {
	return {
		spotify_enabled: state.spotify.enabled,
		radio: state.core.radio,
		radio_enabled: (state.core.radio && state.core.radio.enabled ? true : false),
		tracks: state.core.tracks,
		queue: state.core.queue,
		queue_tlids: state.core.queue_tlids,
		queue_metadata: state.core.queue_metadata,
		current_track: state.core.current_track
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		uiActions: bindActionCreators(uiActions, dispatch),
		pusherActions: bindActionCreators(pusherActions, dispatch),
		spotifyActions: bindActionCreators(spotifyActions, dispatch),
		mopidyActions: bindActionCreators(mopidyActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Queue)