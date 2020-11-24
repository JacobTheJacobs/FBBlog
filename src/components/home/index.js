import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../../store/actions'
class Home extends Component {

    componentDidMount(){

this.props.dispatch(fetchPosts(6,null));
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
const mapStateToProps = state => ({
    reviews:state.reviews
})

export default connect(mapStateToProps)(Home);