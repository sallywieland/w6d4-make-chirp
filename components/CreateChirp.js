import React from 'react'
import PersonalChirp from './PersonalChirp'
// import classAutoBind from 'react-helpers/dist/classAutoBind'

class CreateChirp extends React.Component {
    constructor(props) {
        super(props)
        // classAutoBind(this)
        this.updateFeed = this.updateFeed.bind(this)
        this.fetchTweets = this.fetchTweets.bind(this)
        this.typing = this.typing.bind(this)
        this.state ={
            newChirp: '',
            chirps: [],
        }
    }

    updateFeed() {
        var formData = new FormData()
        formData.append('body', this.state.newChirp)
        formData.append('api_token', sessionStorage.getItem('api_token'))
        // formData.append('tweets', this.state.chirps)

        // sessionStorage.setItem('user', JSON.stringify(response.user))
        fetch('https://4e836632.ngrok.io/tweets', {
            body: formData,
            method: 'POST',
        })
        .then(response => response.json())
        .then(this.fetchTweets)

        this.setState({
            newChirp: ''
        })
    }


    componentDidMount() {
        // need to JSON.parse() because JSON.stringify() on signup/in --> needs to return back into an object from the string we created.
        this.fetchTweets()
    }

    fetchTweets() {
        fetch('https://4e836632.ngrok.io/tweets?api_token=' + sessionStorage.getItem('api_token'))
        // adding the username of whoever signed up/logged in to the fetch URL.
        .then(response => response.json())
        // .then(response => console.log(response))
        .then(response => this.setState({chirps: response.tweets}))
    }

    typing(e) {
        this.setState({
            newChirp: e.target.value
        })
    }

    // click(e) {
    //     let updatedChirps = this.state.chirps
    //     updatedChirps.push(this.state.newChirp)
    //
    //     this.setState({
    //         chirps: updatedChirps
    //     })
    //
    //     this.updatedFeed()
    //     //     sessionStorage.setItem('chirps', JSON.stringify(updatedChirps))
    // }

    render() {
        const PersonalChirps = this.state.chirps.map((item, i) => {
            return <PersonalChirp key={i} data={item} />
            {/* //return <PersonalChirp data={item} key={i} /> */}
        })
        return <div>
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Chirp chirp..." value={this.state.newChirp} onChange={this.typing}/>
                <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={this.updateFeed}>Chirp!</button>
                </span>
            </div>
            {PersonalChirps}
        </div>
    }
}

export default CreateChirp
