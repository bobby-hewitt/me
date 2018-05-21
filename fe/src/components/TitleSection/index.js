import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.css'

class TitleSection extends Component {

	render(){
		return(
			<div className="titleSectionContainer" style={{background:this.props.color}}>
				<div className="zFix">
					<div className="angleTop" style={{borderLeftColor:this.props.color}}/>
						{this.props.text &&
						<div className="titleSectionContent" style={{background:this.props.color}}>
							{this.props.text}
						</div>
						}
						{this.props.children}
					<div className="angleBottom" style={{borderRightColor:this.props.color}}/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleSection)