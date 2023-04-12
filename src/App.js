import React, { Component } from 'react';
import './App.css';
import quotes from './quotes.jsx';
import images from './images.jsx';




class App extends Component {

  constructor() {
    super()
    this.state = {
      index: null,
      indexImg: null,
      allIndexes: [],
      allImgIndexes: [],
    }
  }

  componentDidMount = () => {
    let firstIndex = this.randomIntFromInterval(1, quotes.length);
    let firstIndexImg = this.randomIntFromInterval(1, images.length);

    this.setState({
      index: firstIndex,
      indexImg: firstIndexImg,
      allIndexes: [...this.state.allIndexes, firstIndex],
      allImgIndexes: [...this.state.allIndexes, firstIndexImg],

    })
  }

  randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  handleClick = () => {
    console.log("index", this.state.index)
    console.log("indexImg", this.state.indexImg)

    console.log("allIndexes", this.state.allIndexes)
    console.log("allIMGIndexes", this.state.allImgIndexes)

    const newIndex = this.randomIntFromInterval(1, quotes.length)
    const newImgIndex = this.randomIntFromInterval(1, images.length)
    let allIndexes = [...this.state.allIndexes]
    let allImgIndexes = [...this.state.allImgIndexes]

    allIndexes.push(newIndex)
    allImgIndexes.push(newImgIndex)

    this.setState({
      index: newIndex,
      indexImg: newImgIndex,
      allIndexes: allIndexes,
      allImgIndexes: allImgIndexes,
    }, () => {
      document.querySelector(".bg").classList.add("animate")
      document.querySelector(".blockquote").classList.add("animate")
    })
  }

  handleClickPrev = () => {

    let myNewIndex = this.state.allIndexes.findIndex(el => el === this.state.index) - 1;
    let myNewIndexStory = this.state.allIndexes[myNewIndex < 0 ? 0 : myNewIndex];

    let myNewImgIndex = this.state.allImgIndexes.findIndex(el => el === this.state.indexImg) - 1;
    let myNewImgIndexStory = this.state.allImgIndexes[myNewImgIndex < 0 ? 0 : myNewImgIndex];

    this.setState({
      index: myNewIndexStory,
      indexImg: myNewImgIndexStory
    }, () => {
      document.querySelector(".bg").classList.add("animate")
      document.querySelector(".blockquote").classList.add("animate")
    })
  }

  handleClickNext = () => {

    let myNewIndex = this.state.allIndexes.findIndex(el => el === this.state.index) + 1;
    let myNewImgIndex = this.state.allImgIndexes.findIndex(el => el === this.state.indexImg) + 1;

    console.log("MY NEW INDEX", myNewIndex)
    console.log("this.state.allIndexes", this.state.allIndexes)
    console.log("this.state.allIndexes[myNewIndex]", this.state.allIndexes[myNewIndex])
    console.log("LAST POSSIBLE INDEX", this.state.allIndexes.length - 1)


    if (this.state.allIndexes[myNewIndex]) {
      let myNewIndexStory = this.state.allImgIndexes[myNewIndex];
      let myNewImgIndexStory = this.state.allImgIndexes[myNewImgIndex];

      this.setState({
        index: myNewIndexStory,
        indexImg: myNewImgIndexStory
      }, () => {
        document.querySelector(".bg").classList.add("animate")
        document.querySelector(".blockquote").classList.add("animate")
      })
    } else {

      this.handleClick()

    }


  }



  render() {
    return (
      <div>
        {this.state.index &&
          <div id="quote-box" className="blockquote-wrapper">

            <div key={"img" + this.state.indexImg} className="bg"
              style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 2, 252, 0), rgba(0, 0, 0, 0.73)), url(/bg/${images[this.state.indexImg]})` }}></div>

            <div className="blockquote" key={this.state.index}>
              <span className="quotes">‟</span>
              <h1 id="text"> {quotes[this.state.index].quote} </h1>
              <div className="arrows">
              <h2 id="author">{quotes[this.state.index].author}</h2>
              <div id="old-quote" onClick={() => this.handleClickPrev()} className="arrow left"></div>
              <div id="new-quote" onClick={() => this.handleClickNext()} className="arrow right"></div>
            </div>
             
            </div>

            
            <a href={`https://twitter.com/intent/tweet?text=${quotes[this.state.index].quote} ${quotes[this.state.index].author}.`} id="tweet-quote" target="_blank" rel="noreferrer">Tweet it</a>
             
          </div>

        }

      </div>
    );

  }


}

export default App;
