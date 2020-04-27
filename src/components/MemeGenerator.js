import React from "react"

class MemeGenerator extends React.Component{
    constructor(){
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                console.log(memes[0])
                this.setState({ allMemeImgs: memes })
            })
    }

    handleChange(event){

        const {name, value} = event.target

        this.setState({[name]: value})

    }

    handleSubmit(event){
        event.preventDefault()
        const rNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const rImg = this.state.allMemeImgs[rNum].url

        this.setState({
            randomImage: rImg
        })
    }
    render(){
        return(
            <div className="meme-gen">
                <form className="meme-form">
                    <input
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                        className="top-text"
                    />
                    <input
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                        className="bottom-text"
                    />
                    <button onClick={this.handleSubmit}>Generate</button>
                </form>
                <div className="output">
                    <img src={this.state.randomImage} alt=""></img>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator